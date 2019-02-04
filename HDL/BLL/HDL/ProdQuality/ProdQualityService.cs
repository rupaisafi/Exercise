using DAL.HDL.DataService;
using DBManager;
using Entities.HDL;

namespace BLL.HDL.ProdQuality
{
    public class ProdQualityService : IProdQualityRepository
    {
        readonly ProdQualityDataService _dataService = new ProdQualityDataService();

        public string SaveProdQuality(ProdQualityEntity prodQuality)
        {
            return _dataService.SaveProdQuality(prodQuality);
        }

        public GridEntity<ProdQualityEntity> GetProdQualitySummary(GridOptions options)
        {
            return _dataService.GetProdQualityEntity(options);
        }

    }
}
