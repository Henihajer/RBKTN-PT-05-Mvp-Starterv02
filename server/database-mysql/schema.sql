-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema analyse
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema analyse
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `analyse` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `analyse` ;

-- -----------------------------------------------------
-- Table `analyse`.`analyses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `analyse`.`analyses` (
  `idanalyse` INT NOT NULL AUTO_INCREMENT,
  `design_an` VARCHAR(255) NOT NULL,
  `price_an` VARCHAR(45) NOT NULL,
  `resultat` VARCHAR(45) NULL,
  `image` VARCHAR(45) NULL,
  `Client` VARCHAR(255) NULL,
  `date` DATE NULL,
  PRIMARY KEY (`idanalyse`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `analyse`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `analyse`.`clients` (
  `idclient` INT NOT NULL AUTO_INCREMENT,
  `nom_client` VARCHAR(255) NOT NULL,
  `adresse` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idclient`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `analyse`.`liste-analyse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `analyse`.`liste-analyse` (
  `idliste-analyse` INT NOT NULL AUTO_INCREMENT,
  `desi_analy` VARCHAR(255) NOT NULL,
  `prix_ana` INT NOT NULL,
  PRIMARY KEY (`idliste-analyse`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
