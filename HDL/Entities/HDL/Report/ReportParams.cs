using System;
using System.Collections.Generic;
using System.Data;

namespace Entities.HDL.Report
{
    public class ReportsParams<T>
    {
        public string RptFileName { get; set; }
        public string ReportTitle { get; set; }
        public string ReportSubTitle { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public string ReportType { get; set; }
        public Int32 CompanyId { get; set; }
        public string CompanyName { get; set; }
        public List<T> DataSource { get; set; }
        public DataSet DataSetSource { get; set; }
        public DataTable DataTableSource { get; set; }
        public bool IsSubReport { get; set; }
        public dynamic SubReportDataSources { get; set; }
        public bool IsPassParamToCr { get; set; }
        public string DataSetName { get; set; }
        public string MachineName { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
        public bool IsNullDataSource { get; set; }
    }
}
