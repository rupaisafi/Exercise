using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;
using Entities.HDL.DTO;

namespace BLL.HDL.MrrInfo
{
    public class MrrInfoService : IMrrInfoRepository
    {
        readonly MrrInfoDataService _mrrInfoDataService = new MrrInfoDataService();
        public ImpLcInfo GetLcInfoByLcNo(string lcNo)
        {
            return _mrrInfoDataService.GetLcInfoByLcNo(lcNo);
        }

        public List<ItemInfoEntity> GetItemByLcNo(string lcNo)
        {
            return _mrrInfoDataService.GetItemByLcNo(lcNo);
        }

        public List<MrrBalance> GetMrrBalanceSummary(GridOptions options, string lcNo)
        {
            return _mrrInfoDataService.GetMrrBalanceSummary(options, lcNo);
        }

        public MrrInformation SaveMrrInfo(MrrInformation objMrr, List<MrrDetails> objMrrDetails)
        {
            var rv = new MrrInformation();

            //-------------------MRR Details information------------------------------------------
            var mrrDetailsDt = new DataTable();
            mrrDetailsDt.Columns.Add("ICODE");
            mrrDetailsDt.Columns.Add("RQNTY");
            mrrDetailsDt.Columns.Add("RRATE");
            mrrDetailsDt.Columns.Add("RVALUE");
            mrrDetailsDt.Columns.Add("UNIT");
            mrrDetailsDt.Columns.Add("CURCODE");
            mrrDetailsDt.Columns.Add("CRATE");
            mrrDetailsDt.Columns.Add("VTAKA");
            mrrDetailsDt.Columns.Add("LOTNO");
            mrrDetailsDt.Columns.Add("USERNAME");
            mrrDetailsDt.Columns.Add("PTGL");
            mrrDetailsDt.Columns.Add("EDATE");
            mrrDetailsDt.Columns.Add("REMARKS");
            mrrDetailsDt.Columns.Add("COMPLETE");
            mrrDetailsDt.Columns.Add("ISCODE");
            mrrDetailsDt.Columns.Add("ISPECIFICATION");
            mrrDetailsDt.Columns.Add("SLOT");
            mrrDetailsDt.Columns.Add("MID");
            mrrDetailsDt.Columns.Add("DEPARTMENTID");
            mrrDetailsDt.Columns.Add("SETNO");
            mrrDetailsDt.Columns.Add("YARNCODE");
            mrrDetailsDt.Columns.Add("CONEPERBAG");
            mrrDetailsDt.Columns.Add("CONEPERLENGTH");
            mrrDetailsDt.Columns.Add("TOTALNOOFBAG");
            mrrDetailsDt.Columns.Add("GCODE");
            mrrDetailsDt.Columns.Add("LCCOST");
            mrrDetailsDt.Columns.Add("WITHOUTCOSTRATE");
            mrrDetailsDt.Columns.Add("WITHOUTCOSTRVALUE");
            mrrDetailsDt.Columns.Add("SPRNO");
            mrrDetailsDt.Columns.Add("MFDDATE");
            mrrDetailsDt.Columns.Add("EXPDATE");
            mrrDetailsDt.Columns.Add("COTTONTYPEID");
     

            if (objMrrDetails != null && objMrrDetails.Count > 0)
                foreach (var order in objMrrDetails)
                {
                    var row1 = mrrDetailsDt.NewRow();
                    row1["ICODE"] = order.ICode;
                    row1["RQNTY"] = order.RQnty;
                    row1["RRATE"] = order.RRate;
                    row1["RVALUE"] = order.RValue;
                    row1["UNIT"] = order.Unit;
                    row1["CURCODE"] = order.CurCode;
                    row1["CRATE"] = order.CRate;
                    row1["VTAKA"] = order.VTaka;
                    row1["LOTNO"] = order.LotNo;
                    row1["USERNAME"] = objMrr.UserId;
                    row1["PTGL"] = order.PTGL;//n
                    row1["EDATE"] = DateTime.Now.ToString("dd-MMM-yyyy");
                    row1["REMARKS"] = order.Remarks;
                   // row1["COMPLETE"] = order.Complete; //n
                    row1["ISCODE"] = order.ISCode;//n
                    row1["ISPECIFICATION"] = order.ISpecification;//n
                   // row1["SLOT"] = order.SLot;//n
                    row1["MID"] = order.MID;//n
                    row1["DEPARTMENTID"] = order.DepartmentId;
                    row1["SETNO"] = order.SetNo;
                    row1["YARNCODE"] = order.YarnCode;
                    row1["CONEPERBAG"] = order.ConePerBag;//n
                    row1["CONEPERLENGTH"] = order.ConePerLenght;
                    row1["TOTALNOOFBAG"] = order.TotalNoOfBag;//n
                    row1["GCODE"] = order.GCode;//n
                    row1["LCCOST"] = order.LCCost;//n
                    row1["WITHOUTCOSTRATE"] = order.WithOutCostRate;
                    row1["WITHOUTCOSTRVALUE"] = order.WithOutCostRValue;
                    row1["SPRNO"] = order.SPRNo;//n
                    row1["MFDDATE"] = Convert.ToDateTime(order.MfdDate).ToString("dd-MMM-yyyy");
                    row1["EXPDATE"] = Convert.ToDateTime(order.ExpDate).ToString("dd-MMM-yyyy");
                    row1["COTTONTYPEID"] = order.CottonTypeId;

                    mrrDetailsDt.Rows.Add(row1);
                }
            mrrDetailsDt.TableName = "tblMrrDetails";
            DataSet dsMrrDetails = new DataSet("dsMrrDetails");
            dsMrrDetails.Tables.Add(mrrDetailsDt);

            return _mrrInfoDataService.SaveMrrInfo(objMrr, dsMrrDetails);

        }

        public GridEntity<MrrInformation> GetMrrInfoSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return _mrrInfoDataService.GetMrrInfoSummary(options, dateFrom, dateTo);
        }

        public List<MrrDetails> GetAllGridData(string mrrId)
        {
            return _mrrInfoDataService.GetAllGridData(mrrId);
        }
    }
}
