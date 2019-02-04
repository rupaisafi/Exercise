using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.ItemInfo
{
    public interface IItemInfoRepository
    {
        List<ItemGroup> GetAllGroupName();
        List<ItemType> GetAllItemType();
        string SaveItemInfo(ItemInfoEntity objItem);
        GridEntity<ItemInfoEntity> GetItemInfoSummary(GridOptions options);
        ItemInfoEntity GenerateMaxItemCode();
    }
}
