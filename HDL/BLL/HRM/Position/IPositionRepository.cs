using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.HRM;

namespace BLL.HRM.Position
{
    public interface IPositionRepository
    {
        List<Common_Position> GetPositions();
    }
}
