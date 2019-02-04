using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class Payroll_AllowanceByDesGroup
    {
        public int AllowanceByDesGroupID { get; set; }
        public int DesGroupID { get; set; }
        public double LunchPayRate { get; set; }
        public double TiffinPayRate { get; set; }
        public double IftarPayRate { get; set; }
        public double NightPayRate { get; set; }
        public double HolidayPayRate { get; set; }
        public DateTime EffectDate { get; set; }
        public string DesGroupName { get; set; }
    }
}
