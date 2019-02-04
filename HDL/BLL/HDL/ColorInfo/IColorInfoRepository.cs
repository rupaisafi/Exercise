using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.ColorInfo
{
    public interface IColorInfoRepository
    {
        List<Color> GetAllColor();
        string SaveColorInfo(Color objColor);
        GridEntity<Color> GetColorInfoSummary(GridOptions options);
    }
}
