interface IUsuarioMedico {
  _id: string;
  nombre: string;
  img: string;
}
interface IHospitalMedico {
  _id: string;
  nombre: string;
  img: string;
}

export class Medico {
  constructor(
    public nombre: string,
    public _id?: string,
    public img?: string,
    public usuario?: IUsuarioMedico,
    public hospital?: IHospitalMedico
  ) {}
}
