using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class TreeItem
    {
        public int id { get; set; }
        public string text { get; set; }

        public string Tag { get; set; }

        public List<TreeItem> items { get; set; }
    }


}
