using System;
using System.Data;
using System.Web;
using Microsoft.Reporting.WebForms;

namespace HDLERP.Reports
{
    public partial class ReportViewerRDLC : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["CurrentUser"] != null)
                {
                    LoadReport();
                }
                else
                {
                    Response.Redirect("~//Home//Logoff");
                }
            }

        }
        private void LoadReport()
        {
            var reportType = HttpContext.Current.Session["ReportType"].ToString();
            var reportPram = (dynamic)HttpContext.Current.Session["ReportParam"];

            bool isValid = true;
            if (reportPram != null && string.IsNullOrEmpty(reportPram.RptFileName)) // Checking is Report name provided or not
            {
                isValid = false;
            }

            if (isValid) // If Report Name provided then do other operation
            {
                Page.Title = "ACC | " + reportPram.ReportTitle;

                var dt = new DataTable();
                reportPram.ReportType = reportType;

                dt = reportPram.DataTableSource;
                bool isnulldata = reportPram.IsNullDataSource;
                if (reportPram.DataTableSource != null || isnulldata)
                {
                    if (!isnulldata && dt.Rows.Count <= 0)
                    {
                        ShowErrorMessage();
                    }
                    else
                    {
                        GenerateReportDocument(reportPram, reportType, dt);
                    }
                }
                else
                {
                    ShowErrorMessage();
                }
            }
        }


        private void ShowErrorMessage()
        {
            //string rptPath = "rpt_blank.rdlc";
            RdlcReportViewer.LocalReport.DataSources.Clear();
            RdlcReportViewer.LocalReport.DataSources.Add(new ReportDataSource("", new DataTable()));
            RdlcReportViewer.LocalReport.ReportPath = Server.MapPath("~/") + "Reports//Rpt//rpt_blank.rdlc";

            //-to show message in report viewer
            //rptViewer.DataBind();
            //rptViewer.LocalReport.Refresh();

            //-to show message in pdf viewer
            var bytes = RdlcReportViewer.LocalReport.Render("PDF");
            Response.Buffer = true;
            Response.ContentType = "application/pdf";
            Response.AddHeader("content-disposition", "inline;attachment; filename=Sample.pdf");
            Response.BinaryWrite(bytes);
            Response.Flush();
            Response.Clear();
        }

        private void GenerateReportDocument(dynamic reportPram, string reportType, DataTable data)
        {
            ReportParameter[] rptParams = new ReportParameter[0];


            if (reportPram.IsPassParamToCr)
            {
                rptParams = ReportParameters(reportPram, reportType, rptParams);
            }

            string dsName = reportPram.DataSetName;
            RdlcReportViewer.LocalReport.DataSources.Clear();
            RdlcReportViewer.LocalReport.DataSources.Add(new ReportDataSource(dsName, data));


            RdlcReportViewer.LocalReport.ReportPath = Server.MapPath("~/") + "Reports//Rpt//" + reportPram.RptFileName;

            //Setting Parameter Value
            if (reportPram.IsPassParamToCr)
            {
                RdlcReportViewer.LocalReport.SetParameters(rptParams);//Add Parameter in Report
            }

            RdlcReportViewer.DataBind();
            RdlcReportViewer.LocalReport.Refresh();

            //for pdf

            //var bytes = rptViewer.LocalReport.Render("PDF");
            //Response.Buffer = true;
            //Response.ContentType = "application/pdf";
            //Response.AddHeader("content-disposition", "inline;attachment; filename=Sample.pdf");
            //Response.BinaryWrite(bytes);
            //Response.Flush(); // send it to the client to download
            //Response.Clear();


        }

        private static ReportParameter[] ReportParameters(dynamic reportPram, string reportType, ReportParameter[] rptParams)
        {
            if (reportType == "CollectionLedgerDetails" || reportType == "CollectionLedgerSummary" || reportType == "LoanInstLedgerDetails" || reportType == "InstallmentCollectionReport")
            {
                rptParams = new ReportParameter[3];
                rptParams[0] = new ReportParameter("rpMachineName", reportPram.MachineName);
                rptParams[1] = new ReportParameter("rpUserName", reportPram.UserName);
                rptParams[2] = new ReportParameter("rpUserId", reportPram.UserId);
            }

            else
            {
                rptParams = new ReportParameter[3];
                rptParams[0] = new ReportParameter("rpMachineName", reportPram.MachineName);
                rptParams[1] = new ReportParameter("rpUserName", reportPram.UserName);
                rptParams[2] = new ReportParameter("rpUserId", reportPram.UserId);
            }
            return rptParams;
        }
    }
}