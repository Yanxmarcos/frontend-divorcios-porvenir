---
name: Gestión de Separación y Divorcio
description: Portal municipal claro y panel jurídico compacto para operar expedientes.
colors:
  institutional-red: "#a51f2b"
  institutional-red-deep: "#7d1520"
  ink: "#17202a"
  slate: "#52606d"
  canvas: "#f3f5f7"
  surface: "#ffffff"
  line: "#dce1e6"
  success: "#16764b"
  warning: "#a35a00"
  info: "#28648a"
typography:
  headline:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.institutional-red}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "20px"
---

## Overview

La parte pública es cordial y explicativa. El panel interno es una herramienta de trabajo: compacto, sobrio, con jerarquía explícita, tablas legibles y acciones vinculadas al estado del expediente.

## Colors

El rojo institucional identifica marca y acciones primarias. Los estados usan verde, ámbar y azul junto con texto e iconos. Las superficies internas se organizan con blanco, gris claro y bordes definidos.

## Typography

Usar una pila sans-serif del sistema para carga rápida y lectura estable. Títulos cortos y funcionales; texto de interfaz entre 13 y 15 px, sin mayúsculas espaciadas como decoración.

## Layout

Panel con barra lateral fija de 248 px, cabecera compacta y contenido máximo de 1600 px. En móvil, navegación superior desplazable y tablas dentro de contenedores con scroll propio. Formularios extensos se dividen por secciones y resumen lateral.

## Elevation & Depth

La jerarquía se construye con bordes, fondos y separación. Sombras pequeñas solo en menús, diálogos y elementos flotantes.

## Shapes

Radios entre 4 y 12 px. Controles y tablas son rectangulares; evitar tarjetas excesivamente redondeadas y cápsulas decorativas.

## Components

Botones tienen verbos concretos. Tablas conservan encabezados y densidad. Los estados combinan etiqueta, color e icono. Los formularios muestran ayuda, error y estado de guardado. Los diálogos administran foco y Escape.

## Do's and Don'ts

Mostrar datos derivados del repositorio, estados vacíos útiles y la franja “Demostración — datos ficticios”. No usar métricas inventadas, botones sin efecto, progreso jurídico porcentual, gradientes decorativos ni gráficos sin decisión asociada.
