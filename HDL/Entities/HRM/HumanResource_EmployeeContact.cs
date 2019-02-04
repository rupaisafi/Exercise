using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.HRM
{
    public class HumanResource_EmployeeContact
    {
        public long EmpID { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string EmailOffice { get; set; }
        public string EmergContact { get; set; }
        public string EmergContactName { get; set; }
        public string RelationWith { get; set; }
        public string Fax { get; set; }
        public string SocialMediaID { get; set; }
        public string PreVillage { get; set; }
        public string PerVillage { get; set; }
        public string PreRoad { get; set; }
        public string PerRoad { get; set; }
        public int? PreDivisionID { get; set; }
        public int? PerDivisionID { get; set; }
        public int? PreThanaID { get; set; }
        public int? PerThanaID { get; set; }
        public int? PreDistrictID { get; set; }
        public int? PerDistrictID { get; set; }
        public string PrePostOffice { get; set; }
        public string PerPostOffice { get; set; }
        public string PrePostCode { get; set; }
        public string PerPostCode { get; set; }
        public string PreVillageBan { get; set; }
        public string PerVillageBan { get; set; }
        public string PreRoadBan { get; set; }
        public string PerRoadBan { get; set; }
        public string PrePostOfficeBan { get; set; }
        public string PerPostOfficeBan { get; set; }
        public string BusStop { get; set; }
    }
}
