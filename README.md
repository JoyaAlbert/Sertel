# Laboratorio de Sertel

## Día 1
Preparación del entorno: Ubuntu Server en máquina virtual, acceso por SSH, instalación de Apache y configuración básica de `/var/www/iroom`.
Conexion al server por:
> ssh -p 2222 alberto@localhost

## Acceso a la web de Apache

Para acceder desde el navegador del ordenador al servidor Apache de la máquina virtual se utiliza un túnel SSH:

```bash
ssh -L 8080:127.0.0.1:80 -p 2222 alberto@127.0.0.1
```

Explicación del comando:

- `ssh`: inicia una conexión segura con la máquina virtual.
- `-L`: crea un túnel desde un puerto del ordenador hacia la máquina virtual.
- `8080`: es el puerto utilizado en el ordenador personal.
- `127.0.0.1:80`: es el puerto 80 de la máquina virtual, donde está funcionando Apache.
- `-p 2222`: utiliza el puerto 2222 para realizar la conexión SSH.
- `alberto@127.0.0.1`: entra en la máquina virtual con el usuario `alberto`.

La terminal debe permanecer abierta mientras se utiliza la página. Después se puede acceder desde el navegador mediante:

```text
http://localhost:8080
```
 
## Hardening aplicado

Se aplicaron estas medidas de seguridad al servidor:

### 1. Se endureció el acceso SSH

Se desactivó el acceso directo como `root` y se dejó el acceso solo con claves SSH.

Se realizó editando el archivo `/etc/ssh/sshd_config` y reiniciando el servicio SSH después.

### 2. Se configuró el cortafuegos

Se habilitó `ufw` y se dejaron permitidos únicamente los puertos necesarios para el servicio.

En este caso se permitió SSH en el puerto `2222` y el acceso web para Apache.

### 3. Se activaron las actualizaciones automáticas de seguridad

Se instaló y configuró `unattended-upgrades` para que se aplicaran automáticamente los parches de seguridad.

Así se mantuvo el sistema actualizado sin depender de hacerlo manualmente cada vez.