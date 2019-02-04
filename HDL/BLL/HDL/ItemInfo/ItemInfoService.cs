using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.ItemInfo
{
    public class ItemInfoService:IItemInfoRepository
    {
        ItemInfoDataService _itemInfoDataService = new ItemInfoDataService();
        public List<ItemGroup> GetAllGroupName()
        {
            return _itemInfoDataService.GetAllGroupName();
        }

        public List<ItemType> GetAllItemType()
        {
            return _itemInfoDataService.GetAllItemType();
        }

        public string SaveItemInfo(ItemInfoEntity objItem)
        {
            var res = "";
            var res1 = CheckIsExist(objItem.IID, objItem.ICNo);
            if (!res1)
            {
                res = _itemInfoDataService.SaveItemInfo(objItem);
            }
            else
            {
                res = Operation.Exists.ToString();
            }
            return res;
        }
        private bool CheckIsExist(int itemId, string itemCode)
        {
            return _itemInfoDataService.CheckIsExist(itemId, itemCode);
        }


        public GridEntity<ItemInfoEntity> GetItemInfoSummary(GridOptions options)
        {
            return _itemInfoDataService.GetItemInfoSummary(options);
        }

        public ItemInfoEntity GenerateMaxItemCode()
        {
            return _itemInfoDataService.GenerateMaxItemCode();
        }
    }
}
