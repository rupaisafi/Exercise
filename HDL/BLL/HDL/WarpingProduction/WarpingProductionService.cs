using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.WarpingProduction
{
    public class WarpingProductionService : IWarpingProductionRepository
    {
        private readonly static WarpingProductionDataService _WarpingProductionDataService = new WarpingProductionDataService();
        public List<SetInfoEntity> GetWarpingSetNo()
        {
            return _WarpingProductionDataService.GetWarpingSetNo();
        }

        public WarpingPlanInfo GetInfoBySetNo(string setNo)
        {
            return _WarpingProductionDataService.GetInfoBySetNo(setNo);
        }

        public List<ItemInfoEntity> GetItemBySetNo(string setNo)
        {
            return _WarpingProductionDataService.GetItemBySetNo(setNo);
        }

        public WarpingPlanInfo GetItemBySetNoAndItem(string setNo, string icNo)
        {
            return _WarpingProductionDataService.GetItemBySetNoAndItem(setNo, icNo);
        }

        public List<LotInfo> GetLotNoByIName(string iName)
        {
            return _WarpingProductionDataService.GetLotNoByIName(iName);
        }

        public WarpingProdInfo SaveWarpingProdInfo(WarpingProdInfo objWarp, List<WarpingProdDetails> objWarpDetails)
        {
            //-------------------Warping Production Details information------------------------------------------
            var rv = new WarpingProdInfo();
            var res = CheckIsExistSetNo(objWarp.IdNo, objWarp.SetNo);
            if (!res)
            {
                var wpDetailsDt = new DataTable();
                wpDetailsDt.Columns.Add("WARPDATE");
                wpDetailsDt.Columns.Add("FLANGENO");
                wpDetailsDt.Columns.Add("FLANGELENGTH");
                wpDetailsDt.Columns.Add("WEAKPOINT");
                wpDetailsDt.Columns.Add("SPILER");
                wpDetailsDt.Columns.Add("SNARL");
                wpDetailsDt.Columns.Add("DOUBLEYARN");
                wpDetailsDt.Columns.Add("DUETOMACHINE");
                wpDetailsDt.Columns.Add("DUETOCONE");
                wpDetailsDt.Columns.Add("BADWDG");
                wpDetailsDt.Columns.Add("TOTALYARNBKG");
                wpDetailsDt.Columns.Add("TERMINATION");
                wpDetailsDt.Columns.Add("TOTAL");
                wpDetailsDt.Columns.Add("REMNANTPERCREEL");
                wpDetailsDt.Columns.Add("WASTAGEPCREEL");
                wpDetailsDt.Columns.Add("OPERATORCARDNO");
                wpDetailsDt.Columns.Add("SHIFTCODE");
                wpDetailsDt.Columns.Add("SHIFTTIME");
                wpDetailsDt.Columns.Add("DESIGNATION");
                wpDetailsDt.Columns.Add("ICODE");
                wpDetailsDt.Columns.Add("UNIT");
                wpDetailsDt.Columns.Add("ICOUNT");
                wpDetailsDt.Columns.Add("ENDSBEAM");
                wpDetailsDt.Columns.Add("BEAMKG");
                wpDetailsDt.Columns.Add("SCODE");
                wpDetailsDt.Columns.Add("YARNCODE");
                wpDetailsDt.Columns.Add("YARNLOT");
                wpDetailsDt.Columns.Add("BREAKAGEPOINT");
                wpDetailsDt.Columns.Add("MSPEED");
                wpDetailsDt.Columns.Add("MEFFI");
                wpDetailsDt.Columns.Add("INTAKE");
                wpDetailsDt.Columns.Add("REMINENT");
                wpDetailsDt.Columns.Add("RECONE");
                wpDetailsDt.Columns.Add("WEASTAGE");
                wpDetailsDt.Columns.Add("IQNTY");
                wpDetailsDt.Columns.Add("RATE");
                wpDetailsDt.Columns.Add("BEAMVALUE");
                wpDetailsDt.Columns.Add("WASTAGEVALUE");
                wpDetailsDt.Columns.Add("STDBRKG");
                wpDetailsDt.Columns.Add("BRUNTIME");
                wpDetailsDt.Columns.Add("CAPCODE");
                wpDetailsDt.Columns.Add("LAPPER");

                if (objWarpDetails != null && objWarpDetails.Count > 0)
                    foreach (var warp in objWarpDetails)
                    {
                        DataRow row1;
                        row1 = wpDetailsDt.NewRow();
                        row1["WARPDATE"] = warp.WarpDate;
                        row1["FLANGENO"] = warp.FlangeNo;
                        row1["FLANGELENGTH"] = warp.FlangeLength;
                        row1["WEAKPOINT"] = warp.WeakPoint;
                        row1["SPILER"] = warp.Spiler;
                        row1["SNARL"] = warp.Snarl;
                        row1["DOUBLEYARN"] = warp.DoubleYarn;
                        row1["DUETOMACHINE"] = warp.DueToMachine;
                        row1["DUETOCONE"] = warp.DueToCone;
                        row1["BADWDG"] = warp.BadWdg;
                        row1["TOTALYARNBKG"] = warp.TotalYarnBkg;
                        row1["TERMINATION"] = warp.Termination;
                        row1["TOTAL"] = warp.Total;
                        row1["REMNANTPERCREEL"] = warp.RemnantPerCreel;
                        row1["WASTAGEPCREEL"] = warp.WastagePCreel;
                        row1["OPERATORCARDNO"] = warp.OperatorCardNo;
                        row1["SHIFTCODE"] = warp.ShiftCode;
                        row1["SHIFTTIME"] = warp.ShiftTime;
                        row1["DESIGNATION"] = warp.Designation;
                        row1["ICODE"] = warp.ICode;
                        row1["UNIT"] = warp.Unit;
                        row1["ICOUNT"] = warp.ICount;
                        row1["ENDSBEAM"] = warp.EndsBeam;
                        row1["BEAMKG"] = warp.BeamKg;
                        row1["SCODE"] = warp.SCode;
                        row1["YARNCODE"] = warp.YarnCode;
                        row1["YARNLOT"] = warp.YarnLot;
                        row1["BREAKAGEPOINT"] = warp.BreakagePoint;
                        row1["MSPEED"] = warp.MSpeed;
                        row1["MEFFI"] = warp.MEffi;
                        row1["INTAKE"] = warp.Intake;
                        row1["REMINENT"] = warp.Reminent;
                        row1["RECONE"] = warp.Recone;
                        row1["WEASTAGE"] = warp.Weastage;
                        row1["IQNTY"] = warp.IQnty;
                        row1["RATE"] = warp.Rate;
                        row1["BEAMVALUE"] = warp.BeamValue;
                        row1["WASTAGEVALUE"] = warp.WastageValue;
                        row1["STDBRKG"] = warp.StdBrkg;
                        row1["BRUNTIME"] = warp.BRunTime;
                        row1["CAPCODE"] = warp.CapCode;
                        row1["LAPPER"] = warp.Lapper;
                        wpDetailsDt.Rows.Add(row1);
                    }
                wpDetailsDt.TableName = "tblwpDetails";
                DataSet dsWarpDetails = new DataSet("dsLcDetails");
                dsWarpDetails.Tables.Add(wpDetailsDt);

                return _WarpingProductionDataService.SaveWarpingProdInfo(objWarp, dsWarpDetails);
            }
            else
            {
                rv.SaveStatus = Operation.Exists.ToString();
                return rv;
            }


            
        }

        public GridEntity<WarpingProdInfo> GetWarpingProdSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return _WarpingProductionDataService.GetWarpingProdSummary(options, dateFrom, dateTo);
        }

        public List<WarpingProdDetails> GetAllGridData(string idNo)
        {
            return _WarpingProductionDataService.GetAllGridData(idNo);
        }

        private bool CheckIsExistSetNo(int idNo, int setNo)
        {
            return _WarpingProductionDataService.CheckIsExistSetNo(idNo, setNo);
        }
    }
}
