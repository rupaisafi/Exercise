using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL.DTO
{
    public class PlanningInfoSummaryEntity
    {
        public int PID { get; set; }
        public DateTime PDate { get; set; }
        public int UnitCode { get; set; }
        public int SetNo { get; set; }
        public decimal SetLength { get; set; }
        public int CustCode { get; set; }
        public string MerkUserId { get; set; }
        public decimal OQnty { get; set; }
        public decimal Rate { get; set; }
        public decimal Value { get; set; }
        public string PIWidth { get; set; }
        public string PIShrink { get; set; }
        public string SetPlaned { get; set; }
        public decimal TotalTargetLength { get; set; }
        public decimal TakenProd { get; set; }
        public decimal RemainingProd { get; set; }
        public string Remarks { get; set; }
        public int ProdTypeId { get; set; }
        public int OrderTypeId { get; set; }
        public string OrderStatus { get; set; }
        public string BuyerId { get; set; }
        public DateTime DeliDate { get; set; }
        public int OrderRef { get; set; }
        public string StyleNo { get; set; }
        public int StyleCode { get; set; }
        public decimal WpLength { get; set; }
        public decimal DyLength { get; set; }
        public decimal WvLength { get; set; }
        public decimal FiLength { get; set; }
        public decimal InsLength { get; set; }
        public decimal Rej { get; set; }
        public decimal DyeProd { get; set; }
        public string EndBuyer { get; set; }
        public string CSV { get; set; }
        public string SaveStatus { get; set; }
        public string YarnName { get; set; }
        public string CustName { get; set; }
        public decimal OrderQty { get; set; }
        public string BuyerName { get; set; }
        //===========================================details---
        public string Weight { get; set; }
        public int TypeId { get; set; }
        public string Construction { get; set; }
        public string FConstruction { get; set; }
        public string Weave { get; set; }
        public string Width1 { get; set; }
        public int ColourId { get; set; }
        public string FabricDesc { get; set; }
        public int TCode { get; set; }
        public string FEPIxPPI { get; set; }
        public string FinishingRoute { get; set; }
        public string WarpRatio { get; set; }
        public string WeftRatio { get; set; }
        public int TEnds { get; set; }
        public string ShadeIndigo { get; set; }
        public string ShadeBlack { get; set; }
        public string YarnCode { get; set; }
        public string SetStd { get; set; }
        public string WashStd { get; set; }
        public string Appearnce { get; set; }
        public string WarpShrinkage { get; set; }
        public string WeftShrinkage { get; set; }
        public string WeightFinish { get; set; }
        public string WeightWash { get; set; }
        public string StretchAbblity { get; set; }
        public string Skew { get; set; }
        public string Movement { get; set; }
        public string FinishWidth { get; set; }
        public decimal FinishLength { get; set; }
        public decimal GreyWidth { get; set; }
        public decimal GreyWeight { get; set; }
        public decimal GreyEPI { get; set; }
        public decimal GreyPPI { get; set; }
        public decimal ReedSpace { get; set; }
        public decimal ReedCount { get; set; }
        public decimal EndDent { get; set; }
        //==============warping
        public string EndsPerBeam { get; set; }
        public string NoOfBeam { get; set; }
        public string NoOfCreal { get; set; }
        public int TotalEnds { get; set; }
        public int MSpeed { get; set; }
        public string YarnTension { get; set; }
        public int ProcessingForce { get; set; }
        public string YarnCounts { get; set; }
        public string WarpRatioWp { get; set; }
        public string ProYarnLot { get; set; }
        public string ProYarnSupp { get; set; }
        //======================Dyeing-------------------
        public int LengthMtr { get; set; }
        public int ColorId { get; set; }
        public string BeamSpace { get; set; }
        public string BeamLength { get; set; }
        public string RefStd { get; set; }

        //=============Weaving=============================
        public string YarnCountsWv { get; set; }
        public string ProYarnLotWv { get; set; }
        public string ProYarnSuppWv { get; set; }
        public string WeaveRatio { get; set; }
        public decimal GreyWidthWv { get; set; }
        public decimal GreyLength { get; set; }
        public string Selvedge { get; set; }
        public string GreyPPIWv { get; set; }
        public decimal Weigth { get; set; }
    }
}
