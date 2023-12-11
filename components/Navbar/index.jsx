import styles from "./styles.module.scss";
import React from "react";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MK Seguros</div>
      <div className={styles.botoes}>
        <ul>
          <li>
            <a href="http://localhost:3000/apolices">Apolices</a>
          </li>
          <li>
            <a href="http://localhost:3000/cadastroApolice">Nova Apolice</a>
          </li>

          <li>
            <a href="http://localhost:3000/comissao">Comissoes</a>
          </li>

          <li>
            <a className={styles.lougout} href="#">
              Sair
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
