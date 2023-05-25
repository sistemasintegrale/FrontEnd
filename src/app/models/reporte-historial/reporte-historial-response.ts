export class ReporteHistorialResponse{
  constructor(
    public  placa : string,
    public  nombreCliente : string,
    public  marca : string,
    public  modelo : string,
    public  numeroOrden : string,
    public  situacion : string,
    public  numeroDocumento : string,
    public  fechaOrden : string,
    public  descripcionTipoServicio : string,
    public  kilometraje : string,
    public  cantidad: number,
    public  descripcionServicio: string,
    public  precioTotalItem: number,
    public  codigoMoneda: number
  ){};


}
