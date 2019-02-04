using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class Common_Unit
    {
        public int UnitId { get; set; }
        public int CompanyId { get; set; }
        public string UnitName { get; set; }
        public string UnitNameBan { get; set; }
        public bool IsActive { get; set; }
        public string CompanyName { get; set; }
    }
}
