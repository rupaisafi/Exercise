using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.LcInfo
{
    public class LcInfoService:ILcInfoRepository
    {
        readonly LcInfoDataService _lcInfoDataService = new LcInfoDataService();
        public ImpLcInfo SaveLcInfo(ImpLcInfo objLc, List<ImpLcDetails> objLcDetails)
        {
            var rv = new ImpLcInfo();
            var res = CheckIsExist(objLc.LcId, objLc.LcNo);
            if (!res)
            {
                //-------------------import LC Details information------------------------------------------
                var lcDetailsDt = new DataTable();
                lcDetailsDt.Columns.Add("ITEMCODE");
                lcDetailsDt.Columns.Add("QNTY");
                lcDetailsDt.Columns.Add("UNIT");
                lcDetailsDt.Columns.Add("RATE");
                lcDetailsDt.Columns.Add("AMOUNT");
                lcDetailsDt.Columns.Add("CONVRATE");
                lcDetailsDt.Columns.Add("VALUETAKA");
                lcDetailsDt.Columns.Add("YARNCODE");
                lcDetailsDt.Columns.Add("CURRENCYID");
                lcDetailsDt.Columns.Add("USERID");
                lcDetailsDt.Columns.Add("GROUPID");


                if (objLcDetails != null && objLcDetails.Count > 0)
                    foreach (var order in objLcDetails)
                    {
                        DataRow row1;
                        row1 = lcDetailsDt.NewRow();
                        row1["ITEMCODE"] = order.ItemCode;
                        row1["QNTY"] = order.Qnty;
                        row1["RATE"] = order.Rate;
                        row1["UNIT"] = order.Unit;
                        row1["AMOUNT"] = order.Amount;
                        row1["CONVRATE"] = order.ConvRate;
                        row1["VALUETAKA"] = order.ValueTaka;
                        row1["YARNCODE"] = order.YarnCode;
                        row1["CURRENCYID"] = order.CurrencyId;
                        row1["USERID"] = order.UserId;
                        row1["GROUPID"] = order.GroupId;
                        lcDetailsDt.Rows.Add(row1);
                    }
                lcDetailsDt.TableName = "tblLcDetails";
                DataSet dsLcDetails = new DataSet("dsLcDetails");
                dsLcDetails.Tables.Add(lcDetailsDt);

                return _lcInfoDataService.SaveLcInfo(objLc, dsLcDetails);
            }
            else
            {
                rv.SaveStatus = Operation.Exists.ToString();
                return rv;
            }
        }

        public GridEntity<ImpLcInfo> GetLcInfoSummary(GridOptions options)
        {
            return _lcInfoDataService.GetLcInfoSummary(options);
        }

        public List<ImpLcDetails> GetAllGridData(string lcId)
        {
            return _lcInfoDataService.GetAllGridData(lcId);
        }

        private bool CheckIsExist(int lcId, string lcNo)
        {
            return _lcInfoDataService.CheckIsExist(lcId, lcNo);
        }
    }
}
