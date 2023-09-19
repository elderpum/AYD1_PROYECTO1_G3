USE sys;
DROP DATABASE aydProyecto1;
CREATE DATABASE aydProyecto1;
USE aydProyecto1;




CREATE TABLE Organizador (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
	Apellido VARCHAR(255) NOT NULL,
    CorreoElectronico VARCHAR(255) NOT NULL UNIQUE,
    Contrasena VARCHAR(255) NOT NULL,
	FechaNacimiento datetime NOT NULL,
	Genero ENUM('masculino', 'femenino', 'otro') NOT NULL,
	NombreInstitucionEmpresa VARCHAR(255),
    Descripcion TEXT,
	DireccionEmpresa TEXT,
	NumeroTelefono VARCHAR(20) NOT NULL,
	AceptacionTerminosCondiciones tinyint(1) NOT NULL,
    errores int NOT NULL
    -- Otros campos relevantes de los organizadores
);

CREATE TABLE Evento(
	idEvento INT AUTO_INCREMENT PRIMARY KEY,
	titulo VARCHAR(100) NOT NULL,
	descripcion varchar(1000),
	fechaHora DATE NOT NULL,
	duracion TIME NOT NULL,
	ubicacion varchar(250),
	costo NUMERIC(10,2) NOT NULL,
	imagen VARCHAR(150),
	FormatoEvento ENUM('presencial', 'hibrido', 'virtual') not null,
	idOrganizador INT NOT NULL,
	FOREIGN KEY (idOrganizador) REFERENCES Organizador(ID)
);

CREATE TABLE CategoriaEvento(
	idCategoriaEvento INT AUTO_INCREMENT PRIMARY KEY,
	Categoria ENUM("Área común",
					  "Ciencia",
					  "Tecnología",
					  "Medicina",
					  "Derecho",
					  "Arquitectura",
					  "Programación",
					  "Sistemas",
					  "Ingeniería",
					  "Finanzas",
					  "Diseño gráfico",
					  "Deporte",
					  "Ocio",
					  "Matemática",
					  "Física",
					  "Contabilidad"),
	idEvento INT NOT NULL,
	FOREIGN KEY (idEvento) REFERENCES Evento(idEvento)
);

CREATE TABLE Material(
	idMaterial INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(200) NOT NULL,
	descripcion VARCHAR(1000),
	link VARCHAR(150) NOT NULL,
	idEvento INT,
	fecha DATE NOT NULL,
	FOREIGN KEY (idEvento) REFERENCES Evento(idEvento)
);

CREATE TABLE CategoriaMaterial(
	idCategoriaMaterial INT AUTO_INCREMENT PRIMARY KEY,
	Categoria ENUM("Área común",
					  "Ciencia",
					  "Tecnología",
					  "Medicina",
					  "Derecho",
					  "Arquitectura",
					  "Programación",
					  "Sistemas",
					  "Ingeniería",
					  "Finanzas",
					  "Diseño gráfico",
					  "Deporte",
					  "Ocio",
					  "Matemática",
					  "Física",
					  "Contabilidad"),
	idMaterial INT NOT NULL,
	FOREIGN KEY (idMaterial) REFERENCES Material(idMaterial)
);

create table estudiantes
(
    id_estudiante    int auto_increment
        primary key,
    nombre           varchar(150) not null,
    apellido         varchar(150) not null,
    email            varchar(150) not null,
    password         text         not null,
    fecha_nacimiento datetime     not null,
    genero           text         not null,
    nivel_educacion  varchar(100) not null,
    departamento     varchar(150) not null,
    telefono         int          not null,
    atc              tinyint(1)   not null,
    errores          int          null
);

create table evento_estudiante_U
(
    id_evento_estudiante_U int not null
        primary key,
    id_evento              int not null,
    id_estudiante          int not null,
    constraint evento_estudiante_U_Evento_idEvento_fk
        foreign key (id_evento) references Evento (idEvento),
    constraint evento_estudiante_U_estudiantes_id_estudiante_fk
        foreign key (id_estudiante) references estudiantes (id_estudiante)
);



create table Administrador
(
    id_admin int  not null,
    name     text not null,
    pass     text not null,
    errores  int NOT NULL,
    constraint Administrador_pk
        primary key (id_admin)
);
