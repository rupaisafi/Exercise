using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HRM;
using Entities.HRM;

namespace BLL.HRM.Position
{
    public class PositionService : IPositionRepository
    {
        private readonly PositionDataService _dataService = new PositionDataService();
        public List<Common_Position> GetPositions()
        {
            return _dataService.GetPositions();
        }
    }
}
