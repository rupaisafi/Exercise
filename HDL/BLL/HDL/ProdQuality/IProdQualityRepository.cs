using DBManager;

namespace BLL.HDL.ProdQuality
{
    public interface IProdQualityRepository
    {
        string SaveProdQuality(Entities.HDL.ProdQualityEntity prodQuality);
        GridEntity<Entities.HDL.ProdQualityEntity> GetProdQualitySummary(GridOptions options);
    }
}
