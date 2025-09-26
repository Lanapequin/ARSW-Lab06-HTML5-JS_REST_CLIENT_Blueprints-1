### Escuela Colombiana de Ingeniería
### Arquiecturas de Software

## Construción de un cliente 'grueso' con un API REST, HTML5, Javascript y CSS3. Parte I.

### Integrantes
- Laura Natalia Perilla Quintero - [Lanapequin](https://github.com/Lanapequin)
- Santiago Botero Garcia - [LePeanutButter](https://github.com/LePeanutButter)

### Trabajo individual o en parejas. A quienes tuvieron malos resultados en el parcial anterior se les recomienda hacerlo individualmente.

![](img/mock.png)

* Al oprimir 'Get blueprints', consulta los planos del usuario dado en el formulario. Por ahora, si la consulta genera un error, sencillamente no se mostrará nada.
* Al hacer una consulta exitosa, se debe mostrar un mensaje que incluya el nombre del autor, y una tabla con: el nombre de cada plano de autor, el número de puntos del mismo, y un botón para abrirlo. Al final, se debe mostrar el total de puntos de todos los planos (suponga, por ejemplo, que la aplicación tienen un modelo de pago que requiere dicha información).
* Al seleccionar uno de los planos, se debe mostrar el dibujo del mismo. Por ahora, el dibujo será simplemente una secuencia de segmentos de recta realizada en el mismo orden en el que vengan los puntos.


## Ajustes Backend

1. Trabaje sobre la base del proyecto anterior (en el que se hizo el API REST).
2. Incluya dentro de las dependencias de Maven los 'webjars' de jQuery y Bootstrap (esto permite tener localmente dichas librerías de JavaScript al momento de construír el proyecto):

    ```xml
    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>webjars-locator</artifactId>
    </dependency>

    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>bootstrap</artifactId>
        <version>3.3.7</version>
    </dependency>

    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>jquery</artifactId>
        <version>3.1.0</version>
    </dependency>                

    ```
   
**Respuestas**
1. Se ha retomado la base del proyecto anterior donde se implementó el API REST, asegurando la continuidad y reutilización del código previamente desarrollado.

2. Se han añadido las dependencias necesarias en el archivo pom.xml de Maven para incluir los webjars de jQuery y Bootstrap, lo que permite gestionar estas librerías de JavaScript localmente durante la construcción del proyecto. Esto garantiza que no se dependa de CDNs externos y facilita el despliegue y mantenimiento de la aplicación.

![](img/pom-dependencies.png)

## Front-End - Vistas

1. Cree el directorio donde residirá la aplicación JavaScript. Como se está usando SpringBoot, la ruta para poner en el mismo contenido estático (páginas Web estáticas, aplicaciones HTML5/JS, etc) es:

    ```
    src/main/resources/static
    ```

2. Cree, en el directorio anterior, la página index.html, sólo con lo básico: título, campo para la captura del autor, botón de 'Get blueprints', campo <div> donde se mostrará el nombre del autor seleccionado, [la tabla HTML](https://www.w3schools.com/html/html_tables.asp) donde se mostrará el listado de planos (con sólo los encabezados), y un campo <div> donde se mostrará el total de puntos de los planos del autor. Recuerde asociarle identificadores a dichos componentes para facilitar su búsqueda mediante selectores.

3. En el elemento \<head\> de la página, agregue las referencia a las librerías de jQuery, Bootstrap y a la hoja de estilos de Bootstrap.
    ```html
    <head>
        <title>Blueprints</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <script src="/webjars/jquery/jquery.min.js"></script>
        <script src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet"
          href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />
    </head>
    ```


4. Suba la aplicación (mvn spring-boot:run), y rectifique:
    1. Que la página sea accesible desde:
    ```
    http://localhost:8080/index.html
    ```
    2. Al abrir la consola de desarrollador del navegador, NO deben aparecer mensajes de error 404 (es decir, que las librerías de JavaScript se cargaron correctamente).


**Respuestas:**

1. Se ha creado el directorio `src/main/resources/static`, que es el lugar adecuado para almacenar los archivos estáticos dentro de una aplicación Spring Boot, como páginas HTML, archivos CSS y JavaScript. Este directorio permite que el servidor sirva dichos archivos directamente a los usuarios.

2. Dentro del directorio `static`, se ha creado la página `index.html`. En ella, se incluyen los siguientes elementos básicos:

- Un campo para ingresar el autor.
- Un botón "Get blueprints".
- Un div donde se mostrará el nombre del autor seleccionado.
- Una tabla HTML que mostrará los encabezados para los planos.
- Un div donde se mostrará el total de puntos de los planos del autor.

El HTML se organiza con los identificadores adecuados para facilitar la manipulación con JavaScript. A continuación, el contenido básico de la página index.html

![](img/index-addition.png)- 

```html
<html lang="en" xmlns="http://www.w3.org/1999/html">
    <body>
        <div id="header">
            <h1>Blueprints</h1>
            <div>
               <span>Author</span>
                <label for="searchQuery">Search:</label>
                <input type="search" id="searchQuery">
                <button>Get blueprints</button>
            </div>
        </div>
        <div>
            <div>
                <span>JohnConnor's blueprints</span>
                <table>
                    <thead>
                        <tr>
                            <th>Blueprint name</th>
                            <th>Number of Points</th>
                            <th>Open</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Skynet Defense Grid</td>
                        <td>JohnConnor</td>
                        <td>25</td>
                    </tr>
                    <tr>
                        <td>Time Machine Core</td>
                        <td>JohnConnor</td>
                        <td>17</td>
                    </tr>
                    <tr>
                        <td>Resistance Base Layout</td>
                        <td>JohnConnor</td>
                        <td>30</td>
                    </tr>
                    </tbody>
                </table>
                <span>Total user points: 575</span>
            </div>
            <div>
                <span>Current blueprint: house</span>
                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHNvZGlwb2RpOmRvY25hbWU9Ik5vLUltYWdlLVBsYWNlaG9sZGVyLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4wICg0MDM1YTRmYjQ5LCAyMDIwLTA1LTAxKSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnMiIKICAgdmlld0JveD0iMCAwIDMyOS43Nzc5MiA0MDYuMDA3MzgiCiAgIGhlaWdodD0iNDA2LjAwNzM5IgogICB3aWR0aD0iMzI5Ljc3NzkyIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzNCI+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDk2NyIKICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyI+CiAgICAgIDxzdG9wCiAgICAgICAgIGlkPSJzdG9wOTYzIgogICAgICAgICBvZmZzZXQ9IjAiCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNjMmMyYzI7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIGlkPSJzdG9wOTY1IgogICAgICAgICBvZmZzZXQ9IjEiCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiM5ZjlmOWY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgaXNfdmlzaWJsZT0idHJ1ZSIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDM0MTQiCiAgICAgICBlZmZlY3Q9InNwaXJvIiAvPgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgZWZmZWN0PSJzcGlybyIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDM0MTAiCiAgICAgICBpc192aXNpYmxlPSJ0cnVlIiAvPgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgaXNfdmlzaWJsZT0idHJ1ZSIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDM0MDYiCiAgICAgICBlZmZlY3Q9InNwaXJvIiAvPgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgZWZmZWN0PSJzcGlybyIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDM0MDIiCiAgICAgICBpc192aXNpYmxlPSJ0cnVlIiAvPgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgaXNfdmlzaWJsZT0idHJ1ZSIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDMzOTgiCiAgICAgICBlZmZlY3Q9InNwaXJvIiAvPgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgZWZmZWN0PSJzcGlybyIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDMzOTIiCiAgICAgICBpc192aXNpYmxlPSJ0cnVlIiAvPgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgaXNfdmlzaWJsZT0idHJ1ZSIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDMzODgiCiAgICAgICBlZmZlY3Q9InNwaXJvIiAvPgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgaXNfdmlzaWJsZT0idHJ1ZSIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDMzNzIiCiAgICAgICBlZmZlY3Q9InNwaXJvIiAvPgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgaXNfdmlzaWJsZT0idHJ1ZSIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDMzNjgiCiAgICAgICBlZmZlY3Q9InNwaXJvIiAvPgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgaXNfdmlzaWJsZT0idHJ1ZSIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDMzNjQiCiAgICAgICBlZmZlY3Q9InNwaXJvIiAvPgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgZWZmZWN0PSJzcGlybyIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDMzNjAiCiAgICAgICBpc192aXNpYmxlPSJ0cnVlIiAvPgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgaXNfdmlzaWJsZT0idHJ1ZSIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDMzNDYiCiAgICAgICBlZmZlY3Q9InNwaXJvIiAvPgogICAgPGlua3NjYXBlOnBhdGgtZWZmZWN0CiAgICAgICBscGV2ZXJzaW9uPSIwIgogICAgICAgZWZmZWN0PSJzcGlybyIKICAgICAgIGlkPSJwYXRoLWVmZmVjdDMzOTItOCIKICAgICAgIGlzX3Zpc2libGU9InRydWUiIC8+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ1LjI1NDgzMywwLjM1MzU1MzM4KSIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgeTI9IjEwOC43NzY0OCIKICAgICAgIHgyPSI2NTguNDU4MDEiCiAgICAgICB5MT0iNi41OTk1NTY5IgogICAgICAgeDE9IjY2MC4wNjY1MyIKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDk2OSIKICAgICAgIHhsaW5rOmhyZWY9IiNsaW5lYXJHcmFkaWVudDk2NyIKICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIgLz4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlua3NjYXBlOmRvY3VtZW50LXJvdGF0aW9uPSIwIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjQyIgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMDQiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIHVuaXRzPSJweCIKICAgICBmaXQtbWFyZ2luLWJvdHRvbT0iMCIKICAgICBmaXQtbWFyZ2luLXJpZ2h0PSIwIgogICAgIGZpdC1tYXJnaW4tbGVmdD0iMCIKICAgICBmaXQtbWFyZ2luLXRvcD0iMCIKICAgICBpbmtzY2FwZTpndWlkZS1iYm94PSJ0cnVlIgogICAgIGlua3NjYXBlOnNuYXAtc21vb3RoLW5vZGVzPSJ0cnVlIgogICAgIHNob3dndWlkZXM9ImZhbHNlIgogICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjeT0iMTA5LjEwMjAyIgogICAgIGlua3NjYXBlOmN4PSIxNDguNDAwNDQiCiAgICAgaW5rc2NhcGU6em9vbT0iMC43MDcxMDY4IgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGlkPSJiYXNlIj4KICAgIDxpbmtzY2FwZTpncmlkCiAgICAgICBvcmlnaW55PSItNTEwLjQyODE4IgogICAgICAgb3JpZ2lueD0iLTM5OS4xMzQzNSIKICAgICAgIGlkPSJncmlkMzMzNiIKICAgICAgIHR5cGU9Inh5Z3JpZCIgLz4KICAgIDxzb2RpcG9kaTpndWlkZQogICAgICAgaWQ9Imd1aWRlMzM3NSIKICAgICAgIG9yaWVudGF0aW9uPSIwLDEiCiAgICAgICBwb3NpdGlvbj0iLTExNy4xMzQzNywtMjUuNTY0MzIxIiAvPgogICAgPHNvZGlwb2RpOmd1aWRlCiAgICAgICBpZD0iZ3VpZGUzMzc3IgogICAgICAgb3JpZW50YXRpb249IjAsMSIKICAgICAgIHBvc2l0aW9uPSItMTE0LjEzNDM3LC0yMy41NjQzMjEiIC8+CiAgICA8c29kaXBvZGk6Z3VpZGUKICAgICAgIGlkPSJndWlkZTMzODAiCiAgICAgICBvcmllbnRhdGlvbj0iMCwxIgogICAgICAgcG9zaXRpb249Ii0xMjEuMTM0MzcsLTI3LjU2NDMyMSIgLz4KICAgIDxzb2RpcG9kaTpndWlkZQogICAgICAgaWQ9Imd1aWRlMzM4MiIKICAgICAgIG9yaWVudGF0aW9uPSIwLDEiCiAgICAgICBwb3NpdGlvbj0iLTExNC4xMzQzNywtMjIuNTY0MzIxIiAvPgogICAgPHNvZGlwb2RpOmd1aWRlCiAgICAgICBpZD0iZ3VpZGUzMzg0IgogICAgICAgb3JpZW50YXRpb249IjAsMSIKICAgICAgIHBvc2l0aW9uPSItMTE0LjEzNDM3LC0yMS41NjQzMjEiIC8+CiAgICA8c29kaXBvZGk6Z3VpZGUKICAgICAgIGlkPSJndWlkZTM0MTYiCiAgICAgICBvcmllbnRhdGlvbj0iLTIsMC41IgogICAgICAgcG9zaXRpb249Ii0xMTUuMTM0MzcsLTI1LjU2NDMxMSIgLz4KICAgIDxzb2RpcG9kaTpndWlkZQogICAgICAgaWQ9Imd1aWRlMzQyMCIKICAgICAgIG9yaWVudGF0aW9uPSItMiwwLjUiCiAgICAgICBwb3NpdGlvbj0iLTExNS4xMzQzNywtMjUuNTY0MzExIiAvPgogICAgPHNvZGlwb2RpOmd1aWRlCiAgICAgICBpZD0iZ3VpZGU0MTgwIgogICAgICAgb3JpZW50YXRpb249IjAuMjQzODIyMDQsLTAuOTY5ODE5OTkiCiAgICAgICBwb3NpdGlvbj0iMjA2LjgwNDQyLDIyMC40MTE5MyIgLz4KICAgIDxzb2RpcG9kaTpndWlkZQogICAgICAgaWQ9Imd1aWRlNDE4MiIKICAgICAgIG9yaWVudGF0aW9uPSIxLDAiCiAgICAgICBwb3NpdGlvbj0iODYuODA0NDI0LDI4MC41MjIyNyIgLz4KICAgIDxzb2RpcG9kaTpndWlkZQogICAgICAgaWQ9Imd1aWRlNDE4NiIKICAgICAgIG9yaWVudGF0aW9uPSIxLDAiCiAgICAgICBwb3NpdGlvbj0iMjA2LjgwNDQyLDI1MC41MjIzMSIgLz4KICAgIDxzb2RpcG9kaTpndWlkZQogICAgICAgaWQ9Imd1aWRlNDE4OCIKICAgICAgIG9yaWVudGF0aW9uPSItMC4yNDM4MjE5OSwwLjk2OTgyIgogICAgICAgcG9zaXRpb249IjIwNi44MDQ0MiwxOTAuMzAxNTYiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzk5LjEzNDM3LC0xMjIuNzkwNTEpIgogICAgIGlkPSJsYXllcjEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSI+CiAgICA8cmVjdAogICAgICAgcnk9IjcuMDEzNjEzNyIKICAgICAgIHk9IjEyMi43OTA1MSIKICAgICAgIHg9IjM5OS4xMzQzNyIKICAgICAgIGhlaWdodD0iNDA2LjAwNzM5IgogICAgICAgd2lkdGg9IjMyOS43Nzc5MiIKICAgICAgIGlkPSJyZWN0MTAxNyIKICAgICAgIHN0eWxlPSJmaWxsOiNlZWVlZWU7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNTkzMzE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiIC8+CiAgICA8ZwogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDMuNzc4MTczLDE5MS4wNDE2MykiCiAgICAgICBpZD0iZzEwMTUiPgogICAgICA8cmVjdAogICAgICAgICBzdHlsZT0iZmlsbDojOWY5ZjlmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoyLjI5OTU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIGlkPSJyZWN0MTAwMiIKICAgICAgICAgd2lkdGg9IjgyLjQ4OTk2NyIKICAgICAgICAgaGVpZ2h0PSI5MC40NzAwMDEiCiAgICAgICAgIHg9IjM5OC43NTgyNyIKICAgICAgICAgeT0iMTc4Ljc0NzA2IgogICAgICAgICByeT0iOC4zOTcwMjUxIgogICAgICAgICB0cmFuc2Zvcm09InJvdGF0ZSgtMTYuMzQyODIyKSIgLz4KICAgICAgPGcKICAgICAgICAgaWQ9ImcxMDAwIgogICAgICAgICB0cmFuc2Zvcm09InJvdGF0ZSgxNi4zMjA1MjksNTM4LjEzNTYzLC0xODQuODk3MjcpIj4KICAgICAgICA8cmVjdAogICAgICAgICAgIHJ5PSI0LjU5NjE5MzgiCiAgICAgICAgICAgeT0iMS42NDk4MDkxIgogICAgICAgICAgIHg9IjU0Ny4xODU4NSIKICAgICAgICAgICBoZWlnaHQ9IjExNS45NjU1MSIKICAgICAgICAgICB3aWR0aD0iMTA3LjgzMzc4IgogICAgICAgICAgIGlkPSJyZWN0OTYxIgogICAgICAgICAgIHN0eWxlPSJmaWxsOnVybCgjbGluZWFyR3JhZGllbnQ5NjkpO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDo1LjM5ODtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmUiIC8+CiAgICAgICAgPGcKICAgICAgICAgICBzdHlsZT0ic3Ryb2tlOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjEzLjA3MDg7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjE3MjY1NDcxLDAsMCwwLjE3MjY1NDcxLDUxMi40OTMyNCwtNi4zMjk2NDU2KSIKICAgICAgICAgICBpZD0iZzg3NSI+CiAgICAgICAgICA8cmVjdAogICAgICAgICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7Y2xpcC1ydWxlOm5vbnplcm87ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtjb2xvci1pbnRlcnBvbGF0aW9uOnNSR0I7Y29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzOmxpbmVhclJHQjtzb2xpZC1jb2xvcjojMDAwMDAwO3NvbGlkLW9wYWNpdHk6MTtmaWxsOiNjY2NjY2M7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjEzLjA3MDg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTttYXJrZXI6bm9uZTtjb2xvci1yZW5kZXJpbmc6YXV0bztpbWFnZS1yZW5kZXJpbmc6YXV0bztzaGFwZS1yZW5kZXJpbmc6YXV0bzt0ZXh0LXJlbmRlcmluZzphdXRvO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiCiAgICAgICAgICAgICBpZD0icmVjdDMzMzgiCiAgICAgICAgICAgICB3aWR0aD0iNDkxLjEwNTU2IgogICAgICAgICAgICAgaGVpZ2h0PSI0NDkuOTk4MTQiCiAgICAgICAgICAgICB4PSIyNzAiCiAgICAgICAgICAgICB5PSIxMDcuMzYyMjciIC8+CiAgICAgICAgICA8cmVjdAogICAgICAgICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7Y2xpcC1ydWxlOm5vbnplcm87ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtjb2xvci1pbnRlcnBvbGF0aW9uOnNSR0I7Y29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzOmxpbmVhclJHQjtzb2xpZC1jb2xvcjojMDAwMDAwO3NvbGlkLW9wYWNpdHk6MTtmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjEzLjA3MDg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTttYXJrZXI6bm9uZTtjb2xvci1yZW5kZXJpbmc6YXV0bztpbWFnZS1yZW5kZXJpbmc6YXV0bztzaGFwZS1yZW5kZXJpbmc6YXV0bzt0ZXh0LXJlbmRlcmluZzphdXRvO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiCiAgICAgICAgICAgICBpZD0icmVjdDMzNDIiCiAgICAgICAgICAgICB3aWR0aD0iNDkxLjEwNTU5IgogICAgICAgICAgICAgaGVpZ2h0PSIyMDkuOTk5NzYiCiAgICAgICAgICAgICB4PSIyNzAiCiAgICAgICAgICAgICB5PSIxMDcuMzYyMjciIC8+CiAgICAgICAgICA8cGF0aAogICAgICAgICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7Y2xpcC1ydWxlOm5vbnplcm87ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtjb2xvci1pbnRlcnBvbGF0aW9uOnNSR0I7Y29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzOmxpbmVhclJHQjtzb2xpZC1jb2xvcjojMDAwMDAwO3NvbGlkLW9wYWNpdHk6MTtmaWxsOiNjY2NjY2M7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjEzLjA3MDg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTttYXJrZXI6bm9uZTtwYWludC1vcmRlcjpzdHJva2U7Y29sb3ItcmVuZGVyaW5nOmF1dG87aW1hZ2UtcmVuZGVyaW5nOmF1dG87c2hhcGUtcmVuZGVyaW5nOmF1dG87dGV4dC1yZW5kZXJpbmc6YXV0bztlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIgogICAgICAgICAgICAgZD0ibSAzMDAsMzE3LjM2MjU1IDM4LjQ2MTQ3LC01My41MzgxOCA2MC41MzA5NywtNDUuMTYwODQgMTUuODgyNzcsMTguNTczOTQgMTMuNjEyODUsLTM4LjY4MzU2IDguMjAxMzMsLTIuOTgxODggMTMuMzEwNiwtMjguMjA5MyAxODAsMTc5Ljk5OTc5IgogICAgICAgICAgICAgaWQ9InBhdGgzMzQ0IgogICAgICAgICAgICAgaW5rc2NhcGU6cGF0aC1lZmZlY3Q9IiNwYXRoLWVmZmVjdDMzNDYiCiAgICAgICAgICAgICBpbmtzY2FwZTpvcmlnaW5hbC1kPSJtIDMwMCwzMTcuMzYyNTUgMzguNDYxNDcsLTUzLjUzODE4IDYwLjUzMDk3LC00NS4xNjA4NCAxNS44ODI3NywxOC41NzM5NCAxMy42MTI4NSwtMzguNjgzNTYgOC4yMDEzMywtMi45ODE4OCAxMy4zMTA2LC0yOC4yMDkzIDE4MCwxNzkuOTk5NzkiCiAgICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjY2NjYyIgLz4KICAgICAgICAgIDxwYXRoCiAgICAgICAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtjbGlwLXJ1bGU6bm9uemVybztkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtvcGFjaXR5OjE7aXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO2NvbG9yLWludGVycG9sYXRpb246c1JHQjtjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6bGluZWFyUkdCO3NvbGlkLWNvbG9yOiMwMDAwMDA7c29saWQtb3BhY2l0eToxO2ZpbGw6I2IzYjNiMztmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MTMuMDcwODtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO21hcmtlcjpub25lO3BhaW50LW9yZGVyOnN0cm9rZTtjb2xvci1yZW5kZXJpbmc6YXV0bztpbWFnZS1yZW5kZXJpbmc6YXV0bztzaGFwZS1yZW5kZXJpbmc6YXV0bzt0ZXh0LXJlbmRlcmluZzphdXRvO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiCiAgICAgICAgICAgICBkPSJtIDE4MCw2MCBjIDQuMDkzMTEsMTYuNDc0Njg4IDcuNzEyMTksMzMuMDY3Mjc3IDEwLjg1MTU2LDQ5Ljc1IDIuMzgyNTYsMTIuNjYwOTcgNC40ODg1NywyNS4zNzQwOCA2LjMxNjQxLDM4LjEyNjk1IGwgLTIyLjA2NDQ1LC03LjE2MDE1IC00Ni4xMTEzMywtMjkuNDE2MDIgNS4zMjQyMiw0Ni40MjU3OCAtMS42MTUyNCwyNC43ODcxMSAxMC4wNTI3NCwzMC4zNzY5NSA3My4xODU1NCwtMTEuNzU1ODUgTCAzMDAsMTgwIDI1Mi4xOTkyMiwxMDIuNTY2NDEgMjQyLjUsMTE3LjUgMjE1LjM3NSw5NS4zNzUgWiIKICAgICAgICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI3MCwxMDcuMzYyMjcpIgogICAgICAgICAgICAgaWQ9InBhdGgzMzkwLTAiCiAgICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjc2NjY2NjY2NjY2NjYyIgLz4KICAgICAgICAgIDxwYXRoCiAgICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICAgICAgaW5rc2NhcGU6b3JpZ2luYWwtZD0ibSA0MTkuOTk5OTksMzQ3LjM2MjUyIDgxLjg5OTE4LC03NC40Mjk1OSAxOC41MDU3NCwtOS42ODAwOSAyMy42NTEyLC00NC4xODg5NCAyNS45NDM4OCwtMjEuNzAxMjEgMTc5Ljk5OTk5LDE3OS45OTk3OSIKICAgICAgICAgICAgIGlua3NjYXBlOnBhdGgtZWZmZWN0PSIjcGF0aC1lZmZlY3QzMzYwIgogICAgICAgICAgICAgaWQ9InBhdGgzMzU4IgogICAgICAgICAgICAgZD0ibSA0MTkuOTk5OTksMzQ3LjM2MjUyIDgxLjg5OTE4LC03NC40Mjk1OSAxOC41MDU3NCwtOS42ODAwOSAyMy42NTEyLC00NC4xODg5NCAyNS45NDM4OCwtMjEuNzAxMjEgMTc5Ljk5OTk5LDE3OS45OTk3OSIKICAgICAgICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2NsaXAtcnVsZTpub256ZXJvO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MTtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7Y29sb3ItaW50ZXJwb2xhdGlvbjpzUkdCO2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVyczpsaW5lYXJSR0I7c29saWQtY29sb3I6IzAwMDAwMDtzb2xpZC1vcGFjaXR5OjE7ZmlsbDojY2NjY2NjO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDoxMy4wNzA4O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7bWFya2VyOm5vbmU7cGFpbnQtb3JkZXI6c3Ryb2tlO2NvbG9yLXJlbmRlcmluZzphdXRvO2ltYWdlLXJlbmRlcmluZzphdXRvO3NoYXBlLXJlbmRlcmluZzphdXRvO3RleHQtcmVuZGVyaW5nOmF1dG87ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIKICAgICAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjIiAvPgogICAgICAgICAgPHBhdGgKICAgICAgICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2NsaXAtcnVsZTpub256ZXJvO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MTtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7Y29sb3ItaW50ZXJwb2xhdGlvbjpzUkdCO2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVyczpsaW5lYXJSR0I7c29saWQtY29sb3I6IzAwMDAwMDtzb2xpZC1vcGFjaXR5OjE7ZmlsbDojYjNiM2IzO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDoxMy4wNzA4O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7bWFya2VyOm5vbmU7cGFpbnQtb3JkZXI6c3Ryb2tlO2NvbG9yLXJlbmRlcmluZzphdXRvO2ltYWdlLXJlbmRlcmluZzphdXRvO3NoYXBlLXJlbmRlcmluZzphdXRvO3RleHQtcmVuZGVyaW5nOmF1dG87ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIKICAgICAgICAgICAgIGQ9Im0gNTY5Ljk5OTk5LDE5Ny4zNjI2OSAzNS45Mzg4LDgwLjkxMjg5IHYgMzAuMTEwMzggMzAuMTEwMzggbCAyMi40NTg2NCwxOS40NjY1MiBjIDYuNTI0NTMsLTYuNDUwMzEgMTQuMTQ4OTMsLTExLjc4NTI2IDIyLjQ0NDMxLC0xNS43MDQ3NyAxNC44MjQ1LC03LjAwNDQ3IDMxLjMzODIzLC05LjM1OTU5IDQ3LjE3MDU3LC0xMy42MjE3IDYuNDI3NzYsLTEuNzMwMzcgMTIuOTA2NzIsLTMuODU0MTkgMTguMjEzNDMsLTcuODcyNzcgMS4zNTE3NCwtMS4wMjM2MiAyLjYxNTkyLC0yLjE2MjgxIDMuNzc0MjQsLTMuNDAxMDcgaCAtMzAgbCAtNDAuNTIxNDksLTQwLjU1MDA2IC0yOS44NTY0NSwtNDguOTE5NzIgLTEwLjI1MzA3LDguODM4ODYgeiIKICAgICAgICAgICAgIGlkPSJwYXRoMzM4NiIKICAgICAgICAgICAgIGlua3NjYXBlOnBhdGgtZWZmZWN0PSIjcGF0aC1lZmZlY3QzMzg4IgogICAgICAgICAgICAgaW5rc2NhcGU6b3JpZ2luYWwtZD0ibSA1NjkuOTk5OTksMTk3LjM2MjY5IDM1LjkzODgsODAuOTEyODkgdiAzMC4xMTAzOCAzMC4xMTAzOCBsIDIyLjQ1ODY0LDE5LjQ2NjUyIGMgNS43NzMxMSwtNi4zNjQxNiAxMy41NDMzOSwtMTEuNDA4MTUgMjIuNDQ0MzEsLTE1LjcwNDc3IDEzLjAwMzE2LC02LjI3Njg1IDMyLjA0MzIsLTguNzQ4OTkgNDcuMTcwNTcsLTEzLjYyMTcgNi44NzYyLC0yLjIxNDkxIDEyLjY4MDAxLC00LjgxOTk4IDE4LjIxMzQzLC03Ljg3Mjc3IDEuNTU4ODMsLTAuODYwMDEgMS45OTc2NSwtMi42NzEgMy43NzQyNCwtMy40MDEwNyBoIC0zMCBsIC00MC41MjE0OSwtNDAuNTUwMDYgLTI5Ljg1NjQ1LC00OC45MTk3MiAtMTAuMjUzMDcsOC44Mzg4NiB6IgogICAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2Nzc3NjY2NjY2MiIC8+CiAgICAgICAgICA8cGF0aAogICAgICAgICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7Y2xpcC1ydWxlOm5vbnplcm87ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtjb2xvci1pbnRlcnBvbGF0aW9uOnNSR0I7Y29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzOmxpbmVhclJHQjtzb2xpZC1jb2xvcjojMDAwMDAwO3NvbGlkLW9wYWNpdHk6MTtmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjEzLjA3MDg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTttYXJrZXI6bm9uZTtwYWludC1vcmRlcjpzdHJva2U7Y29sb3ItcmVuZGVyaW5nOmF1dG87aW1hZ2UtcmVuZGVyaW5nOmF1dG87c2hhcGUtcmVuZGVyaW5nOmF1dG87dGV4dC1yZW5kZXJpbmc6YXV0bztlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIgogICAgICAgICAgICAgZD0ibSA0MTkuOTk5OTksNTU3LjM2MjI3IGMgLTAuNDE2OTksLTkuNjAwODkgLTguODE3NTksLTE3LjYwODc4IDE3LjEyNTIsLTMwLjY2ODA2IDMxLjgzMTgsLTE2LjAyMzg5IDEyNS44OTUsLTM1Ljg4ODM2IDE1Mi4xNTM3LC01OS45ODQzNCAxOS40MjcwOSwtMTcuODI2ODcgLTcwLjQxNTQsLTM3LjY2OTQ1IC01NS4wMTkxLC01OS4wNzMyMyA2Ljk4MSwtOS43MDUyOCA1OS4wMzcsLTE5Ljk2OTQ3IDgyLjE0NjMsLTMwLjI3Mzg2IDIxLjkwNTY5LC05Ljc2Nzk5IDE1LjE0MTI5LC0xOS44MDMyOCAzMS40MDQ2LC0yOS45NzUwNyAxNS43MDkyLC05LjgyNTU4IDY4LjM0OTksLTE5Ljc3MzU4IDcyLjE4OTI5LC0zMC4wMjUxNiAtMTAuNDEzNTksMTAuNTIxODggLTY4LjgzMzc5LDIwLjQwMzI3IC04OS45OTk5OSwzMC4wMDAyNiAtMjIuMzM3NywxMC4xMjggLTIxLjQ2ODksMTkuOTMwMTggLTQ5LjQzMTMsMjkuNDgzNjcgLTMwLjEyNDUsMTAuMjkyMzkgLTg5LjE0MiwyMC41NTI2OCAtMTAyLjcwNzcsMzAuNTE2MjYgLTI4LjQxMzMsMjAuODY4NTggNDYuODYzLDQyLjU5OTk1IDE2LjIwMjQsNTkuOTk5OTMgQyA0NTIuNTQzMDksNDkwLjkyNTU0IDM0NC43MjE5LDUxMC42NTcxMiAzMDAsNTI3LjM2MjYgYyAtMzAuOTAzOSwxMS41NDM2OSAtMjguNDA3OSwxNy43NDc5OSAtMzAsMjkuOTk5NjciCiAgICAgICAgICAgICBpZD0icGF0aDMzNzAiCiAgICAgICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjc3Nzc3Njc3Nzc3NjIiAvPgogICAgICAgIDwvZz4KICAgICAgPC9nPgogICAgPC9nPgogICAgPHRleHQKICAgICAgIGlkPSJ0ZXh0MTAyMSIKICAgICAgIHk9IjQxMi4xMjUyNyIKICAgICAgIHg9IjU2Mi4wMDY3NyIKICAgICAgIHN0eWxlPSJmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zaXplOjMycHg7bGluZS1oZWlnaHQ6MS4yNTtmb250LWZhbWlseTpzYW5zLXNlcmlmO2ZpbGw6Izc2NzY3NjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZSIKICAgICAgIHhtbDpzcGFjZT0icHJlc2VydmUiPjx0c3BhbgogICAgICAgICBzdHlsZT0iZm9udC1zdHlsZTpub3JtYWw7Zm9udC12YXJpYW50Om5vcm1hbDtmb250LXdlaWdodDpib2xkO2ZvbnQtc3RyZXRjaDpub3JtYWw7Zm9udC1zaXplOjMycHg7Zm9udC1mYW1pbHk6c2Fucy1zZXJpZjstaW5rc2NhcGUtZm9udC1zcGVjaWZpY2F0aW9uOidzYW5zLXNlcmlmIEJvbGQnO3RleHQtYWxpZ246Y2VudGVyO3RleHQtYW5jaG9yOm1pZGRsZSIKICAgICAgICAgeT0iNDEyLjEyNTI3IgogICAgICAgICB4PSI1NjIuMDA2NzciCiAgICAgICAgIGlkPSJ0c3BhbjEwMTkiCiAgICAgICAgIHNvZGlwb2RpOnJvbGU9ImxpbmUiPk5PIElNQUdFPC90c3Bhbj48dHNwYW4KICAgICAgICAgc3R5bGU9ImZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtdmFyaWFudDpub3JtYWw7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXN0cmV0Y2g6bm9ybWFsO2ZvbnQtc2l6ZTozMnB4O2ZvbnQtZmFtaWx5OnNhbnMtc2VyaWY7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjonc2Fucy1zZXJpZiBCb2xkJzt0ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWFuY2hvcjptaWRkbGUiCiAgICAgICAgIGlkPSJ0c3BhbjEwMjMiCiAgICAgICAgIHk9IjQ1Mi4xMjUyNyIKICAgICAgICAgeD0iNTYyLjAwNjc3IgogICAgICAgICBzb2RpcG9kaTpyb2xlPSJsaW5lIj5BVkFJTEFCTEU8L3RzcGFuPjwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=" alt="Placeholder" width="500" height="500">
            </div>
        </div>
    </body>
</html>
```

3. En el `<head>` de la página, se han añadido las referencias a las librerías de jQuery, Bootstrap y la hoja de estilos de Bootstrap como se indicó en el requerimiento. Esto asegura que la página se vea correctamente y funcione con los scripts adecuados.

4. Luego de subir la aplicación con `mvn spring-boot:run`, se verificó lo siguiente:

- La página es accesible desde `http://localhost:8080/index.html`.

   ![](img/localhost.png)

- Al inspeccionar la consola de desarrollador en diferentes navegadores (Chrome, Firefox, Edge), se observa un único error 404 recurrente que corresponde a la falta del archivo favicon.ico.

- Este error del favicon no afecta el funcionamiento ni la carga de las librerías.

   ![](img/favicon-problem.png)

- Las librerías jQuery y Bootstrap se cargan correctamente, como se puede comprobar accediendo directamente a las URLs de los webjars, por ejemplo:

   `http://localhost:8080/webjars/jquery/3.1.0/jquery.min.js`
   
   ![](img/jquery.png)
   
   `http://localhost:8080/webjars/bootstrap/3.3.7/js/bootstrap.min.js`

   ![](img/bootstrap.png)

   `http://localhost:8080/webjars/bootstrap/3.3.7/css/bootstrap.min.css`

   ![](img/bootstrap-css.png)

- No se registran errores 404 ni otros relacionados con la carga de scripts o estilos CSS.


## Front-End - Lógica

1. Ahora, va a crear un Módulo JavaScript que, a manera de controlador, mantenga los estados y ofrezca las operaciones requeridas por la vista. Para esto tenga en cuenta el [patrón Módulo de JavaScript](https://toddmotto.com/mastering-the-module-pattern/), y cree un módulo en la ruta static/js/app.js.

2. Copie el módulo provisto (apimock.js) en la misma ruta del módulo antes creado. En éste agréguele más planos (con más puntos) a los autores 'quemados' en el código.

3. Agregue la importación de los dos nuevos módulos a la página HTML (después de las importaciones de las librerías de jQuery y Bootstrap):
    ```html
    <script src="js/apimock.js"></script>
    <script src="js/app.js"></script>
    ```

3. Haga que el módulo antes creado mantenga de forma privada:
    * El nombre del autor seleccionado.
    * El listado de nombre y tamaño de los planos del autor seleccionado. Es decir, una lista objetos, donde cada objeto tendrá dos propiedades: nombre de plano, y número de puntos del plano.

   Junto con una operación pública que permita cambiar el nombre del autor actualmente seleccionado.


4. Agregue al módulo 'app.js' una operación pública que permita actualizar el listado de los planos, a partir del nombre de su autor (dado como parámetro). Para hacer esto, dicha operación debe invocar la operación 'getBlueprintsByAuthor' del módulo 'apimock' provisto, enviándole como _callback_ una función que:

    * Tome el listado de los planos, y le aplique una función 'map' que convierta sus elementos a objetos con sólo el nombre y el número de puntos.

    * Sobre el listado resultante, haga otro 'map', que tome cada uno de estos elementos, y a través de jQuery agregue un elemento \<tr\> (con los respectvos \<td\>) a la tabla creada en el punto 4. Tenga en cuenta los [selectores de jQuery](https://www.w3schools.com/JQuery/jquery_ref_selectors.asp) y [los tutoriales disponibles en línea](https://www.tutorialrepublic.com/codelab.php?topic=faq&file=jquery-append-and-remove-table-row-dynamically). Por ahora no agregue botones a las filas generadas.

    * Sobre cualquiera de los dos listados (el original, o el transformado mediante 'map'), aplique un 'reduce' que calcule el número de puntos. Con este valor, use jQuery para actualizar el campo correspondiente dentro del DOM.

5. Asocie la operación antes creada (la de app.js) al evento 'on-click' del botón de consulta de la página.

6. Verifique el funcionamiento de la aplicación. Inicie el servidor, abra la aplicación HTML5/JavaScript, y rectifique que al ingresar un usuario existente, se cargue el listado del mismo.

**Respuestas:**

1. a
2. a
3. a
4. a
5. a
6. a


## Para la próxima semana

8. A la página, agregue un [elemento de tipo Canvas](https://www.w3schools.com/html/html5_canvas.asp), con su respectivo identificador. Haga que sus dimensiones no sean demasiado grandes para dejar espacio para los otros componentes, pero lo suficiente para poder 'dibujar' los planos.

9. Al módulo app.js agregue una operación que, dado el nombre de un autor, y el nombre de uno de sus planos dados como parámetros, haciendo uso del método getBlueprintsByNameAndAuthor de apimock.js y de una función _callback_:
    * Consulte los puntos del plano correspondiente, y con los mismos dibuje consectivamente segmentos de recta, haciendo uso [de los elementos HTML5 (Canvas, 2DContext, etc) disponibles](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_canvas_tut_path)* Actualice con jQuery el campo <div> donde se muestra el nombre del plano que se está dibujando (si dicho campo no existe, agruéguelo al DOM).

10. Verifique que la aplicación ahora, además de mostrar el listado de los planos de un autor, permita seleccionar uno de éstos y graficarlo. Para esto, haga que en las filas generadas para el punto 5 incluyan en la última columna un botón con su evento de clic asociado a la operación hecha anteriormente (enviándo como parámetro los nombres correspondientes).

11. Verifique que la aplicación ahora permita: consultar los planos de un auto y graficar aquel que se seleccione.

12. Una vez funcione la aplicación (sólo front-end), haga un módulo (llámelo 'apiclient') que tenga las mismas operaciones del 'apimock', pero que para las mismas use datos reales consultados del API REST. Para lo anterior revise [cómo hacer peticiones GET con jQuery](https://api.jquery.com/jquery.get/), y cómo se maneja el esquema de _callbacks_ en este contexto.

13. Modifique el código de app.js de manera que sea posible cambiar entre el 'apimock' y el 'apiclient' con sólo una línea de código.

14. Revise la [documentación y ejemplos de los estilos de Bootstrap](https://v4-alpha.getbootstrap.com/examples/) (ya incluidos en el ejercicio), agregue los elementos necesarios a la página para que sea más vistosa, y más cercana al mock dado al inicio del enunciado.