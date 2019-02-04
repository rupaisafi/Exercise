using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;

namespace BLL.HRM.Gender
{
    public class GenderService : IGenderRepository
    {
        private readonly GenderDataService _dataService = new GenderDataService();
        public List<Common_Gender> GetGenders()
        {
            return _dataService.GetGenders();
        }
    }
}
