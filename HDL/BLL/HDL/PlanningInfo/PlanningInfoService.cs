using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AUtilities;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;
using Entities.HDL.DTO;

namespace BLL.HDL.PlanningInfo
{
    public class PlanningInfoService : IPlanningInfoRepository
    {
        PlanningInfoDataService _planningInfoDataService = new PlanningInfoDataService();
        public GridEntity<PlanningInfoSummaryEntity> GetPlanningInfoSummary(GridOptions options, string planDateFrom, string planDateTo)
        {
            return _planningInfoDataService.GetPlanningInfoSummary(options, planDateFrom, planDateTo);
        }

        public PlanningInformation SavePlanningInfo(PlanningInformation objPlan, PlanningInfoDetails objPlanDetails, PlanningInfoDetailsWp objWarp, List<PlanningInfoDetailsWp1> objWarpList, PlanningInfoDetailsDye objDyeing, List<PlanningInfoDetailsDye1> objDyeList, PlanningInfoDetailsWv objWeav, List<PlanningInfoDetailsWv1> objWeavList)
        {
            var objPlanning = new PlanningInformation();
            bool rv = false;

            rv = CheckIsExist(objPlan.PID,objPlan.SetNo.ToString());//check set no is exist or not

            if (!rv)
            {
                //-------------------warping information------------------------------------------
                var warpingInfo_dt = new DataTable();
                warpingInfo_dt.Columns.Add("PID");
                warpingInfo_dt.Columns.Add("ICODE");
                warpingInfo_dt.Columns.Add("SCODE");
                warpingInfo_dt.Columns.Add("YCODE");
                warpingInfo_dt.Columns.Add("YCOUNT");
                warpingInfo_dt.Columns.Add("LOT");
                warpingInfo_dt.Columns.Add("NOOFBEEM");
                warpingInfo_dt.Columns.Add("NOOFCREEL");
                warpingInfo_dt.Columns.Add("ENDSPERBEEM");
                warpingInfo_dt.Columns.Add("TENDS");
                warpingInfo_dt.Columns.Add("RATE");
                warpingInfo_dt.Columns.Add("VALUE");
                warpingInfo_dt.Columns.Add("COST");
                warpingInfo_dt.Columns.Add("COSTYDS");
                warpingInfo_dt.Columns.Add("COSTKG");
                warpingInfo_dt.Columns.Add("QNTY");
                warpingInfo_dt.Columns.Add("SETLENGTH");

                if (objWarpList != null && objWarpList.Count > 0)
                    foreach (var objwarp in objWarpList)
                    {
                        DataRow row1;
                        row1 = warpingInfo_dt.NewRow();
                        row1["PID"] = objwarp.PID;
                        row1["ICODE"] = objwarp.ICode;
                        row1["SCODE"] = objwarp.SCode;
                        row1["YCODE"] = objwarp.YCode;
                        row1["YCOUNT"] = objwarp.YCount;
                        row1["LOT"] = objwarp.Lot;
                        row1["NOOFBEEM"] = objwarp.NoOfBeem;
                        row1["NOOFCREEL"] = objwarp.NoOfCreel;
                        row1["ENDSPERBEEM"] = objwarp.EndsPerBeem;
                        row1["TENDS"] = objwarp.TEnds;
                        row1["RATE"] = objwarp.Rate;
                        row1["VALUE"] = objwarp.Value;
                        row1["COST"] = objwarp.Cost;
                        row1["COSTYDS"] = objwarp.CostYds;
                        row1["COSTKG"] = objwarp.CostKg;
                        row1["QNTY"] = objwarp.Qnty;
                        row1["SETLENGTH"] = objwarp.SetLength;
                        warpingInfo_dt.Rows.Add(row1);
                    }
                warpingInfo_dt.TableName = "tblWarping";
                DataSet dsWarping = new DataSet("dsWarping");
                dsWarping.Tables.Add(warpingInfo_dt);

                //-------------------dyeing information------------------------------------------
                var dyeingInfo_dt = new DataTable();
                dyeingInfo_dt.Columns.Add("PID");
                dyeingInfo_dt.Columns.Add("ICODE");
                dyeingInfo_dt.Columns.Add("SCODE");
                dyeingInfo_dt.Columns.Add("YCODE");
                dyeingInfo_dt.Columns.Add("YCOUNT");
                dyeingInfo_dt.Columns.Add("RATE");
                dyeingInfo_dt.Columns.Add("VALUE");
                dyeingInfo_dt.Columns.Add("QNTY");
                dyeingInfo_dt.Columns.Add("REMARKS");
                if (objDyeList != null && objDyeList.Count > 0)
                    foreach (var objDye in objDyeList)
                    {
                        DataRow row1;
                        row1 = dyeingInfo_dt.NewRow();
                        row1["PID"] = objDye.PID;
                        row1["ICODE"] = objDye.ICode;
                        row1["SCODE"] = objDye.SCode;
                        row1["YCODE"] = objDye.YCode;
                        row1["YCOUNT"] = objDye.YCount;
                        row1["RATE"] = objDye.Rate;
                        row1["VALUE"] = objDye.Value;
                        row1["QNTY"] = objDye.Qnty;
                        row1["REMARKS"] = objDye.Remarks;
                        dyeingInfo_dt.Rows.Add(row1);
                    }
                dyeingInfo_dt.TableName = "tblDyeing";
                DataSet dsDyeing = new DataSet("dsDyeing");
                dsDyeing.Tables.Add(dyeingInfo_dt);

                //-------------------Weaving information------------------------------------------
                var weavingInfo_dt = new DataTable();
                weavingInfo_dt.Columns.Add("PID");
                weavingInfo_dt.Columns.Add("ICODE");
                weavingInfo_dt.Columns.Add("SCODE");
                weavingInfo_dt.Columns.Add("YCODE");
                weavingInfo_dt.Columns.Add("YCOUNT");
                weavingInfo_dt.Columns.Add("RATE");
                weavingInfo_dt.Columns.Add("VALUE");
                weavingInfo_dt.Columns.Add("QNTY");
                weavingInfo_dt.Columns.Add("LOT");
                weavingInfo_dt.Columns.Add("WEFTRATIO");
                weavingInfo_dt.Columns.Add("COST");
                weavingInfo_dt.Columns.Add("COSTYDS");
                weavingInfo_dt.Columns.Add("COSTKG");
                weavingInfo_dt.Columns.Add("EPI");
                weavingInfo_dt.Columns.Add("PPI");
                weavingInfo_dt.Columns.Add("TWEFTRATIO");
                weavingInfo_dt.Columns.Add("NEEDSPERYDSKG");

                if (objWeavList != null && objWeavList.Count > 0)
                    foreach (var objWv in objWeavList)
                    {
                        DataRow row1;
                        row1 = weavingInfo_dt.NewRow();
                        row1["PID"] = objWv.PID;
                        row1["ICODE"] = objWv.ICode;
                        row1["SCODE"] = objWv.SCode;
                        row1["YCODE"] = objWv.YCode;
                        row1["YCOUNT"] = objWv.YCount;
                        row1["RATE"] = objWv.Rate;
                        row1["VALUE"] = objWv.Value;
                        row1["QNTY"] = objWv.Qnty;
                        row1["LOT"] = objWv.Lot;
                        row1["WEFTRATIO"] = objWv.WeftRatio;
                        row1["COST"] = objWv.Cost;
                        row1["COSTYDS"] = objWv.CostYds;
                        row1["COSTKG"] = objWv.CostKg;
                        row1["EPI"] = objWv.EPI;
                        row1["PPI"] = objWv.PPI;
                        row1["TWEFTRATIO"] = objWv.TWeftRatio;
                        row1["NEEDSPERYDSKG"] = objWv.NeedPerYdsKg;
                        weavingInfo_dt.Rows.Add(row1);
                    }
                weavingInfo_dt.TableName = "tblWeaving";
                DataSet dsWeaving = new DataSet("dsWeaving");
                dsWeaving.Tables.Add(weavingInfo_dt);

                return _planningInfoDataService.SavePlanningInfo(objPlan, objPlanDetails, objWarp,objDyeing,objWeav, dsWarping, dsDyeing, dsWeaving);

            }
            else
            {
                objPlanning.SaveStatus = Operation.Exists.ToString();
                return objPlanning;
            }
        }

        private bool CheckIsExist(int planId,string setNo)
        {
            return _planningInfoDataService.CheckIsExist(planId,setNo);
        }

        public List<PlanningDetails> GetAllGridData(string planId)
        {
            var res = new List<PlanningDetails>();
            var obj = new PlanningDetails();
            var ds = new DataSet();
            ds = _planningInfoDataService.GetAllGridData(planId);
            if (ds != null)
            {
                obj.WarpingInfo = (List<PlanningInfoDetailsWp1>)ListConversion.ConvertTo<PlanningInfoDetailsWp1>(ds.Tables[0]);
                obj.DyeingInfo = (List<PlanningInfoDetailsDye1>)ListConversion.ConvertTo<PlanningInfoDetailsDye1>(ds.Tables[1]);
                obj.WeavingInfo = (List<PlanningInfoDetailsWv1>)ListConversion.ConvertTo<PlanningInfoDetailsWv1>(ds.Tables[2]);
                res.Add(obj);
            }

            return res;
        }

        public List<Unit> GetAllUnit()
        {
            return _planningInfoDataService.GetAllUnit();
        }

        public List<Entities.HDL.SetInfoEntity> GetSetNoByUnit(int unitCode)
        {
            return _planningInfoDataService.GetSetNoByUnit(unitCode);
        }

        public Order GetOrderInfoByOrderNo(string orderNo)
        {
            return _planningInfoDataService.GetOrderInfoByOrderNo(orderNo);
        }

        public List<Style> GetStyleInfoByOrderNo(string orderNo)
        {
            return _planningInfoDataService.GetStyleInfoByOrderNo(orderNo);
        }

        public OrderStyleInfo GetOrderInfoByByOrderNoAndStyle(string orderNo, string styleCode)
        {
            return _planningInfoDataService.GetOrderInfoByByOrderNoAndStyle(orderNo, styleCode);
        }
        public List<LotInfo> GetLotNoByIName(string iName)
        {
            return _planningInfoDataService.GetLotNoByIName(iName);
        }
        public LotInfo GetLotInfoByINameAndLotNo(string iName, string lotNo)
        {
            return _planningInfoDataService.GetLotInfoByINameAndLotNo(iName, lotNo);
        }

    }
}
