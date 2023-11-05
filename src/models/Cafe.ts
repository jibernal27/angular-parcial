export class Cafe {
  id: number;
  nombre: string;
  tipo: string;
  region: string;
  sabor: string;
  altura: number;
  imagen: string;

  constructor(
    id: number,
    nombre: string,
    tipo: string,
    region: string,
    sabor: string,
    altura: number,
    imagen: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.region = region;
    this.sabor = sabor;
    this.altura = altura;
    this.imagen = imagen;
  }

  public static fromJson(cafeJson: any): Cafe {
    return new Cafe(
      cafeJson.id,
      cafeJson.nombre,
      cafeJson.tipo,
      cafeJson.region,
      cafeJson.sabor,
      cafeJson.altura,
      cafeJson.imagen
    );
  }
}
