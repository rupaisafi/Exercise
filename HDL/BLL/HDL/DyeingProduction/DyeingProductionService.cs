using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.DyeingProduction
{
    public class DyeingProductionService : IDyeingProductionRepository
    {
        private readonly static DyeingProductionDataService _DyeingProductionDataService = new DyeingProductionDataService();

        public DyeingPlanInfo GetInfoBySetNo(string setNo)
        {
            return _DyeingProductionDataService.GetInfoBySetNo(setNo);
        }

        public Style GetInfoByStyleCode(string styleCode)
        {
            return _DyeingProductionDataService.GetInfoByStyleCode(styleCode);
        }

        public DyeingProdInfo SaveDyeingProdInfo(DyeingProdInfo prodInfo, List<DyeingProdDetailsDyeRope> dyeRopes, List<DyeingProdDetailsLCBRope> lCBRopes, List<DyeingProdDetailsSizingSlasherRope> sizingSlasherRopes)
        {
            //-------------------Warping Production Details information------------------------------------------
            var rv = new DyeingProdInfo();
            var res = CheckIsExistSetNo(prodInfo.DID, prodInfo.SetNo);
            if (!res)
            {
                var dyeRopeDt = new DataTable("tblDyeRope");
                dyeRopeDt.Columns.Add("DID");
                dyeRopeDt.Columns.Add("DDATE");
                dyeRopeDt.Columns.Add("SHIFTCODE");
                dyeRopeDt.Columns.Add("SHIFTNAME");
                dyeRopeDt.Columns.Add("BALLNO");
                dyeRopeDt.Columns.Add("CANNO");
                dyeRopeDt.Columns.Add("WARPLENGTH");
                dyeRopeDt.Columns.Add("DYLENGTH");
                dyeRopeDt.Columns.Add("SPEED");
                dyeRopeDt.Columns.Add("PO");
                dyeRopeDt.Columns.Add("OP");
                dyeRopeDt.Columns.Add("COLORMAN");
                dyeRopeDt.Columns.Add("CAPTAIN");
                dyeRopeDt.Columns.Add("STOPMARK");
                dyeRopeDt.Columns.Add("LAPPER");
                dyeRopeDt.Columns.Add("CREELLAPPER");
                dyeRopeDt.Columns.Add("ROPEUT");
                dyeRopeDt.Columns.Add("REMARKS");
                dyeRopeDt.Columns.Add("CUTENDSWR");

                if (dyeRopes != null && dyeRopes.Count > 0)
                    foreach (var dyeRope in dyeRopes)
                    {
                        DataRow row;
                        row = dyeRopeDt.NewRow();
                        row["DID"] = dyeRope.DID;
                        row["DDATE"] = dyeRope.DDate.ToString("dd-MMM-yyyy");
                        row["SHIFTCODE"] = dyeRope.ShiftCode;
                        row["SHIFTNAME"] = dyeRope.ShiftName;
                        row["BALLNO"] = dyeRope.BallNo;
                        row["CANNO"] = dyeRope.CanNo;
                        row["WARPLENGTH"] = dyeRope.WarpLength;
                        row["DYLENGTH"] = dyeRope.DyLength;
                        row["SPEED"] = dyeRope.Speed;
                        row["PO"] = dyeRope.PO;
                        row["OP"] = dyeRope.OP;
                        row["COLORMAN"] = dyeRope.ColorMan;
                        row["CAPTAIN"] = dyeRope.Captain;
                        row["STOPMARK"] = dyeRope.StopMark;
                        row["LAPPER"] = dyeRope.Lapper;
                        row["CREELLAPPER"] = dyeRope.CreelLapper;
                        row["ROPEUT"] = dyeRope.RopeCut;
                        row["REMARKS"] = dyeRope.Remarks;
                        row["CUTENDSWR"] = dyeRope.CutEndsWr;
                        dyeRopeDt.Rows.Add(row);
                    }

                var lCBRopeDt = new DataTable("tblLCBRope");
                lCBRopeDt.Columns.Add("DID");
                lCBRopeDt.Columns.Add("LDATE");
                lCBRopeDt.Columns.Add("SHIFTCODE");
                lCBRopeDt.Columns.Add("CANNO");
                lCBRopeDt.Columns.Add("BEAMNO");
                lCBRopeDt.Columns.Add("MCNO");
                lCBRopeDt.Columns.Add("SPEED");
                lCBRopeDt.Columns.Add("LCBLENGTH");
                lCBRopeDt.Columns.Add("PO");
                lCBRopeDt.Columns.Add("OP");
                lCBRopeDt.Columns.Add("SVISOR");
                lCBRopeDt.Columns.Add("TENSION");
                lCBRopeDt.Columns.Add("BRKG");
                lCBRopeDt.Columns.Add("CUTTINGENDS");
                lCBRopeDt.Columns.Add("LOOSEEND");
                lCBRopeDt.Columns.Add("ROPECUT");
                lCBRopeDt.Columns.Add("REMARKS");
                lCBRopeDt.Columns.Add("REEDTIME");
                lCBRopeDt.Columns.Add("DYCAPTAINCEND");
                lCBRopeDt.Columns.Add("QC");
                lCBRopeDt.Columns.Add("DYOPCEND");

                if (lCBRopes != null && lCBRopes.Count > 0)
                    foreach (var lCBRope in lCBRopes)
                    {
                        DataRow row;
                        row = lCBRopeDt.NewRow();
                        row["DID"] = lCBRope.DID;
                        row["LDATE"] = lCBRope.LDate.ToString("dd-MMM-yyyy");
                        row["SHIFTCODE"] = lCBRope.ShiftCode;
                        row["CANNO"] = lCBRope.CanNo;
                        row["BEAMNO"] = lCBRope.BeamNo;
                        row["MCNO"] = lCBRope.MCNo;
                        row["SPEED"] = lCBRope.Speed;
                        row["LCBLENGTH"] = lCBRope.LCBLength;
                        row["PO"] = lCBRope.PO;
                        row["OP"] = lCBRope.OP;
                        row["SVISOR"] = lCBRope.SVisor;
                        row["TENSION"] = lCBRope.Tension;
                        row["BRKG"] = lCBRope.Brkg;
                        row["CUTTINGENDS"] = lCBRope.CuttingEnds;
                        row["LOOSEEND"] = lCBRope.LooseEnd;
                        row["ROPECUT"] = lCBRope.RopeCut;
                        row["REEDTIME"] = lCBRope.ReedTime;
                        row["DYCAPTAINCEND"] = lCBRope.DyCaptainCEnd;
                        row["QC"] = lCBRope.QC;
                        row["DYOPCEND"] = lCBRope.DyOPCEnd;
                        lCBRopeDt.Rows.Add(row);
                    }

                var sizingDt = new DataTable("tblSizing");
                sizingDt.Columns.Add("DID");
                sizingDt.Columns.Add("SDATE");
                sizingDt.Columns.Add("SHIFTCODE");
                sizingDt.Columns.Add("SHIFTNAME");
                sizingDt.Columns.Add("SSNO");
                sizingDt.Columns.Add("BEAMNO");
                sizingDt.Columns.Add("LENGTH");
                sizingDt.Columns.Add("PO");
                sizingDt.Columns.Add("SIZER");
                sizingDt.Columns.Add("DO");
                sizingDt.Columns.Add("CAPTAIN");
                sizingDt.Columns.Add("ROPEDYECAP");
                sizingDt.Columns.Add("ROPEDYEOP");
                sizingDt.Columns.Add("STICKYENDSLEFT");
                sizingDt.Columns.Add("STICKYENDSRIGHT");
                sizingDt.Columns.Add("BRKGPOINT");
                sizingDt.Columns.Add("STOPTIME");
                sizingDt.Columns.Add("STOPPAGE");
                sizingDt.Columns.Add("LAPPERCREEL");
                sizingDt.Columns.Add("LAPPERDYEING");
                sizingDt.Columns.Add("LAPPERSIZING");
                sizingDt.Columns.Add("NOOFLAPPER");
                sizingDt.Columns.Add("LAPPERTYPE");
                sizingDt.Columns.Add("SIZINGCODE");
                sizingDt.Columns.Add("SIZINGMC");
                sizingDt.Columns.Add("REMARKS");

                if (sizingSlasherRopes != null && sizingSlasherRopes.Count > 0)
                    foreach (var sizingSlasherRope in sizingSlasherRopes)
                    {
                        DataRow row;
                        row = sizingDt.NewRow();

                        row["DID"] = sizingSlasherRope.DID;
                        row["SDATE"] = sizingSlasherRope.SDate.ToString("dd-MMM-yyyy");
                        row["SHIFTCODE"] = sizingSlasherRope.ShiftCode;
                        row["SHIFTNAME"] = sizingSlasherRope.ShiftName;
                        row["SSNO"] = sizingSlasherRope.SSNo;
                        row["BEAMNO"] = sizingSlasherRope.BeamNo;
                        row["LENGTH"] = sizingSlasherRope.Length;
                        row["PO"] = sizingSlasherRope.PO;
                        row["SIZER"] = sizingSlasherRope.Sizer;
                        row["DO"] = sizingSlasherRope.DO;
                        row["CAPTAIN"] = sizingSlasherRope.Captain;
                        row["ROPEDYECAP"] = sizingSlasherRope.RopeDyeCap;
                        row["ROPEDYEOP"] = sizingSlasherRope.RopeDyePO;
                        row["STICKYENDSLEFT"] = sizingSlasherRope.StickyEndsLeft;
                        row["STICKYENDSRIGHT"] = sizingSlasherRope.StickyEndsRight;
                        row["BRKGPOINT"] = sizingSlasherRope.BrkgPoint;
                        row["STOPTIME"] = sizingSlasherRope.StopTime;
                        row["STOPPAGE"] = sizingSlasherRope.Stoppage;
                        row["LAPPERCREEL"] = sizingSlasherRope.LapperCreel;
                        row["LAPPERDYEING"] = sizingSlasherRope.LapperDyeing;
                        row["LAPPERSIZING"] = sizingSlasherRope.LapperSizing;
                        row["NOOFLAPPER"] = sizingSlasherRope.NoOfLapper;
                        row["LAPPERTYPE"] = sizingSlasherRope.LapperType;
                        row["SIZINGCODE"] = sizingSlasherRope.SizingCode;
                        row["SIZINGMC"] = sizingSlasherRope.SizingMC;
                        row["REMARKS"] = sizingSlasherRope.Remarks;
                        sizingDt.Rows.Add(row);
                    }

                DataSet dsDyeingProdDetails = new DataSet("dsDyeingProdDetails");
                dsDyeingProdDetails.Tables.Add(dyeRopeDt);
                dsDyeingProdDetails.Tables.Add(lCBRopeDt);
                dsDyeingProdDetails.Tables.Add(sizingDt);

                return _DyeingProductionDataService.SaveDyeingProdInfo(prodInfo, dsDyeingProdDetails);
            }
            else
            {
                rv.SaveStatus = Operation.Exists.ToString();
                return rv;
            }
        }

        public GridEntity<DyeingProdInfo> GetDyeingProdSummary(GridOptions options, string dateFrom, string dateTo)
        {
            return _DyeingProductionDataService.GetDyeingProdSummary(options, dateFrom, dateTo);
        }

        public List<DyeingProdDetailsDyeRope> GetAllDyeRopeGridData(int idNo)
        {
            return _DyeingProductionDataService.GetAllDyeRopeGridData(idNo);
        }
        public List<DyeingProdDetailsLCBRope> GetAllLCBRopeGridData(int idNo)
        {
            return _DyeingProductionDataService.GetAllLCBRopeGridData(idNo);
        }
        public List<DyeingProdDetailsSizingSlasherRope> GetAllSizingGridData(int idNo)
        {
            return _DyeingProductionDataService.GetAllSizingGridData(idNo);
        }

        private bool CheckIsExistSetNo(int idNo, int setNo)
        {
            return _DyeingProductionDataService.CheckIsExistSetNo(idNo, setNo);
        }
    }
}
