using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class HumanResource_EmployeeSeparation
    {
        public long EmpID { get; set; }
        public int EmpStatusID { get; set; }
        public string EmpStatusName { get; set; }
        public DateTime? SubmissionDate { get; set; }
        public DateTime EffectDate { get; set; }
        public int NoticePeriod { get; set; }
        public bool IsWaive { get; set; }
        public string RefNo { get; set; }
        public string Remarks { get; set; }

    }
}
