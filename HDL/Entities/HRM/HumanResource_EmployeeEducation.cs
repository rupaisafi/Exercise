using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class HumanResource_EmployeeEducation
    {
        public int PassingYear { get; set; }
        public string Institute { get; set; }
        public string Result { get; set; }
        public string OutOf { get; set; }
        public Common_Board board { get; set; }
        public Common_Degree degree { get; set; }
    }
}
