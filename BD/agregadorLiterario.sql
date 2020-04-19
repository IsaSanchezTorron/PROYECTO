
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema agregadorLiterario
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `agregadorLiterario` DEFAULT CHARACTER SET utf8 ;
USE `agregadorLiterario` ;

-- -----------------------------------------------------
-- Table `agregadorLiterario`.`CONCURSOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agregadorLiterario`.`CONCURSOS` (
  `concurso_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  `fecha_inicio` DATE NULL,
  `fecha_final` DATE NULL,
  `url_foto` VARCHAR(100) NULL,
  `url_foto2` VARCHAR(100) NULL,
  `descripcion` TEXT NULL,
  `modalidad` VARCHAR(100) NULL,
  `genero` VARCHAR(100) NULL,
  `ciudad` VARCHAR(100) NULL,
  `fecha_publicacion` DATE NULL,
  PRIMARY KEY (`concurso_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agregadorLiterario`.`USUARIOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agregadorLiterario`.`USUARIOS` (
  `usuario_id` INT NOT NULL,
  `nombre` VARCHAR(100) NULL,
  `apellidos` VARCHAR(45) NULL,
  `mail` VARCHAR(100) NULL,
  `contraseña` VARCHAR(100) NULL,
  `url_foto` VARCHAR(100) NULL,
  `descripcion` TEXT NULL,
  `fecha_alta` DATE NULL,
  PRIMARY KEY (`usuario_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agregadorLiterario`.`INSCRIPCIONES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agregadorLiterario`.`INSCRIPCIONES` (
  `CONCURSOS_concurso_id` INT NOT NULL,
  `USUARIOS_usuario_id` INT NOT NULL,
  `fecha_inscripcion` DATE NULL,
  PRIMARY KEY (`CONCURSOS_concurso_id`, `USUARIOS_usuario_id`),
  INDEX `fk_CONCURSO_has_USUARIO_USUARIO1_idx` (`USUARIOS_usuario_id` ASC),
  INDEX `fk_CONCURSO_has_USUARIO_CONCURSO1_idx` (`CONCURSOS_concurso_id` ASC),
  CONSTRAINT `fk_CONCURSO_has_USUARIO_CONCURSO1`
    FOREIGN KEY (`CONCURSOS_concurso_id`)
    REFERENCES `agregadorLiterario`.`CONCURSOS` (`concurso_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CONCURSO_has_USUARIO_USUARIO1`
    FOREIGN KEY (`USUARIOS_usuario_id`)
    REFERENCES `agregadorLiterario`.`USUARIOS` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `agregadorLiterario`.`VALORACIONES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `agregadorLiterario`.`VALORACIONES` (
  `CONCURSOS_id_concurso` INT NOT NULL,
  `USUARIOS_id_usuario` INT NOT NULL,
  `puntuacion` INT NULL,
  `reseña` VARCHAR(500) NULL,
  `fecha_valoracion` DATE NULL,
  PRIMARY KEY (`CONCURSOS_id_concurso`, `USUARIOS_id_usuario`),
  INDEX `fk_CONCURSO_has_USUARIO_USUARIO2_idx` (`USUARIOS_id_usuario` ASC),
  INDEX `fk_CONCURSO_has_USUARIO_CONCURSO2_idx` (`CONCURSOS_id_concurso` ASC),
  CONSTRAINT `fk_CONCURSO_has_USUARIO_CONCURSO2`
    FOREIGN KEY (`CONCURSOS_id_concurso`)
    REFERENCES `agregadorLiterario`.`CONCURSOS` (`concurso_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CONCURSO_has_USUARIO_USUARIO2`
    FOREIGN KEY (`USUARIOS_id_usuario`)
    REFERENCES `agregadorLiterario`.`USUARIOS` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

  
  
