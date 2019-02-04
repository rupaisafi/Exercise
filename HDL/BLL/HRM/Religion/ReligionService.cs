using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;

namespace BLL.HRM.Religion
{
    public class ReligionService : IReligionRepository
    {
        private readonly ReligionDataService _dataService = new ReligionDataService();
        public List<Common_Religion> GetReligions()
        {
            return _dataService.GetReligions();
        }
    }
}
