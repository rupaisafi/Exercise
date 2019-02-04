using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HDL
{
    public class Buyer
    {
        public int BuyerId { get; set; }
        public string BuyerCode { get; set; }
        public string BuyerName { get; set; }
        public string ShortName { get; set; }
        public string PhoneNoPer { get; set; }
        public string PhoneNoOffice { get; set; }
        public string PhoneNoHome { get; set; }
        public string FaxNo { get; set; }
        public string ContactPerson { get; set; }
        public string CpDesignation { get; set; }
        public string Email { get; set; }
        public string BuyerAddr { get; set; }
        public int CountryId { get; set; }
        public int IsActive { get; set; }
        public string UserId { get; set; }
        public string TermId { get; set; }
    }
}
