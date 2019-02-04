using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.MIssue
{
    public class MIssueService:IMIssueRepository
    {
        MIssueDataService _mIssueDataService = new MIssueDataService();
        public MIssueInfo SaveMIssueInfo(MIssueInfo objMIssue, List<MIssueDetails> objMIssueDetails)
        {
            var rv = new MIssueInfo();

            //-------------------MIssue Details information------------------------------------------
            var miDetailsDt = new DataTable();
            miDetailsDt.Columns.Add("ICODE");
            miDetailsDt.Columns.Add("QNTY");
            miDetailsDt.Columns.Add("RATE");
            miDetailsDt.Columns.Add("VALUE");
            miDetailsDt.Columns.Add("UNIT");
            miDetailsDt.Columns.Add("CURCODE");
            miDetailsDt.Columns.Add("RATETAKA");
            miDetailsDt.Columns.Add("VALUETAKA");
            miDetailsDt.Columns.Add("SETNO");
            miDetailsDt.Columns.Add("LCNO");
            miDetailsDt.Columns.Add("INVNO");
            miDetailsDt.Columns.Add("LCODE");
            miDetailsDt.Columns.Add("SCODE");
            miDetailsDt.Columns.Add("LOTNO");
            miDetailsDt.Columns.Add("IMPTYPEID");
            miDetailsDt.Columns.Add("PTGL");
            miDetailsDt.Columns.Add("USERNAME");
            miDetailsDt.Columns.Add("REMARKS");
            miDetailsDt.Columns.Add("AUTOLOT");
            miDetailsDt.Columns.Add("YARNCODE");
            miDetailsDt.Columns.Add("GCODE");
            miDetailsDt.Columns.Add("COTTONTYPEID");


            if (objMIssueDetails != null && objMIssueDetails.Count > 0)
                foreach (var mid in objMIssueDetails)
                {
                    var row1 = miDetailsDt.NewRow();
                    row1["ICODE"] = mid.ICode;
                    row1["QNTY"] = mid.Qnty;
                    row1["RATE"] = mid.Rate;
                    row1["VALUE"] = mid.Value;
                    row1["UNIT"] = mid.Unit;
                    row1["CURCODE"] = mid.CurCode;
                    row1["RATETAKA"] = mid.RateTaka;
                    row1["VALUETAKA"] = mid.ValueTaka;
                    row1["SETNO"] = mid.SetNo;
                    row1["LCNO"] = mid.LCNo;
                    row1["INVNO"] = mid.InvNo;
                    row1["LCODE"] = mid.LCode;
                    row1["SCODE"] = mid.SCode;
                    row1["LOTNO"] = mid.LotNo;
                    row1["IMPTYPEID"] = mid.ImpTypeId;
                    row1["PTGL"] = mid.PTGL;//n
                    row1["USERNAME"] = objMIssue.UserId;
                    row1["REMARKS"] = mid.Remarks;                   
                    row1["AUTOLOT"] = mid.AutoLot;  
                    row1["YARNCODE"] = mid.YarnCode;
                    row1["GCODE"] = mid.GCode;
                    row1["COTTONTYPEID"] = mid.CottonTypeId;

                    miDetailsDt.Rows.Add(row1);
                }
            miDetailsDt.TableName = "tblMIssueDetails";
            DataSet dsMIssueDetails = new DataSet("dsMIssueDetails");
            dsMIssueDetails.Tables.Add(miDetailsDt);

            return _mIssueDataService.SaveMIssueInfo(objMIssue, dsMIssueDetails);
        }

        public GridEntity<MIssueInfo> GetMIssueInfoSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return _mIssueDataService.GetMIssueInfoSummary(options, dateFrom, dateTo);
        }

        public List<MIssueDetails> GetAllGridData(string missueId)
        {
            return _mIssueDataService.GetAllGridData(missueId);
        }
    }
}
