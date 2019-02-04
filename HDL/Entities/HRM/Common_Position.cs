using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class Common_Position
    {
        public int PositionID { get; set; }
        public string PositionName { get; set; }
        public string PositionNameBan { get; set; }
        public bool IsActive { get; set; }
    }
}
