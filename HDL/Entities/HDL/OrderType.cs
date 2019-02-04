using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class OrderType
    {
        public int OCode { get; set; }
        public string OType { get; set; }
    }
    public class ProdType
    {
        public int OCode { get; set; }
        public string OType { get; set; }
    }
    public class ProductionType
    {
        public int TCode { get; set; }
        public string Type { get; set; }
    }
}
