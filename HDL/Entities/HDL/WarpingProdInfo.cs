using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class WarpingProdInfo
    {
        public int IdNo { get; set; }
        public DateTime PWarpDate { get; set; }
        public int WarpLength { get; set; }
        public string Remarks { get; set; }
        public int SetNo { get; set; }
        public string EndsPerBeam { get; set; }
        public int TotalBeam { get; set; }
        public string NoOfBeam { get; set; }
        public decimal TotalCreal { get; set; }
        public string NoOfCreal { get; set; }
        public int TotalEnds { get; set; }
        public int MSpeed { get; set; }
        public string YarnTension { get; set; }
        public int ProcessingForce { get; set; }
        public string Code { get; set; }
        public int LengthMtr { get; set; }
        public int DeptCode { get; set; }
        public string WarpRatio { get; set; }
        public string ProYarnLot { get; set; }
        public string ProYarnSupp { get; set; }
        public string StyleNo { get; set; }
        public int StyleCode { get; set; }
        public string Construction { get; set; }
        public string Width { get; set; }
        public int PTCode { get; set; }
        public int CustCode { get; set; }
        public string MCNo { get; set; }
        public int MCCode { get; set; }
        public int UCode { get; set; }
        public string YarnCounts { get; set; }
        public string UserId { get; set; }
        public string TermId { get; set; }
        public DateTime EDate { get; set; }
        public string SaveStatus { get; set; }

        //============
        public string UnitName { get; set; }
    }
}
