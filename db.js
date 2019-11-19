const express = require("express");

// use process.env variables to keep private variables,
require("dotenv").config();

// Express Middleware
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const bodyParser = require("body-parser"); // turns response into usable format
const cors = require("cors"); // allows/disallows cross-site communication
const morgan = require("morgan"); // logs requests

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

//db Connection w/ localhost
var db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "1234",
    database: "Oficina"
  }
});

// Controllers - aka, the db queries
const main = require("./controller/main.js");

// App
const app = express();

// App Middleware
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("combined")); // use 'tiny' or 'combined'

// App Routes - Auth
app.get("/login", (req, res) => main.login(req, res, db));
app.get("/itens", (req, res) => main.getItens(req, res, db));
app.get("/itens/qtd", (req, res) => main.getItensQtd(req, res, db));
app.get("/reservados", (req, res) => main.getReservados(req, res, db));
app.get("/tipoitens", (req, res) => main.getTipoItens(req, res, db));
app.put("/crud", (req, res) => main.putTableData(req, res, db));
app.get("/tipoItem", (req, res) => main.getTiposItens(req, res, db));
app.delete("/crud", (req, res) => main.deleteTableData(req, res, db));
app.get("/nextItemID", (req, res) => main.getNextCodItem(req, res, db));
app.post("/oneItem", (req, res) => main.getOneItem(req, res, db));
app.post("/novo/item", (req, res) => main.postNewItem(req, res, db));
app.post("/novo/tipoitem", (req, res) => main.postNewTipoItem(req, res, db));
app.put("/update/item", (req, res) => main.putUpdateItem(req, res, db));
app.post("/reserva", (req, res) => main.postNewReserva(req, res, db));
app.get("/usuarios", (req, res) => main.getUsers(req, res, db));
app.get("/empresas", (req, res) => main.getEmpresas(req, res, db));
app.post("/oneUser", (req, res) => main.getOneUser(req, res, db));
app.post("/novo/usuario", (req, res) => main.postNewUsuario(req, res, db));
app.put("/update/usuario", (req, res) => main.putUpdateUsuario(req, res, db));
app.post("/novo/empresa", (req, res) => main.postNewEmpresa(req, res, db));
app.get("/salas", (req, res) => main.getSalas(req, res, db));
app.get("/nextSalaID", (req, res) => main.getNextCodSala(req, res, db));
app.post("/oneSala", (req, res) => main.getOneSala(req, res, db));
app.post("/novo/sala", (req, res) => main.postNewSala(req, res, db));
app.put("/update/sala", (req, res) => main.putUpdateSala(req, res, db));
app.post("/reservaSala", (req, res) => main.postNewReservaSala(req, res, db));
app.post("/userLogin", (req, res) => main.postFazLogin(req, res, db));
app.post("/getAdminNome", (req, res) => main.getAdminNome(req, res, db));
app.put("/inativa/usuario", (req, res) => main.putInativaUsuario(req, res, db));
app.post("/itensBySala", (req, res) => main.getItensBySala(req, res, db));
app.post("/novo/localizacao", (req, res) =>
  main.postNewLocalizacao(req, res, db)
);
app.post("/itensBySalaCount", (req, res) =>
  main.getItensBySalaCount(req, res, db)
);
app.get("/salasreservadas", (req, res) =>
  main.getSalasReservadas(req, res, db)
);
app.post("/reservasSalaByDia", (req, res) =>
  main.getReservasSalaByDia(req, res, db)
);
app.post("/reservasSalaByPeriodo", (req, res) =>
  main.getReservasSalaByPeriodo(req, res, db)
);
app.put("/inativa/reservasala", (req, res) =>
  main.putInativaReservaSala(req, res, db)
);
app.get("/simpleItens", (req, res) => main.getSimpleItens(req, res, db));
app.post("/reservasByEmpresa", (req, res) =>
  main.getReservasByEmpresa(req, res, db)
);
app.post("/reservasByPeriodo", (req, res) =>
  main.getReservasByPeriodo(req, res, db)
);
app.put("/inativa/reserva", (req, res) => main.putInativaReserva(req, res, db));
app.put("/mudaStatusReserva", (req, res) =>
  main.putMudaStatusReserva(req, res, db)
);
app.post("/reservasByEmpresaStatus", (req, res) =>
  main.getReservasByEmpresaStatus(req, res, db)
);
app.get("/localizacoes", (req, res) => main.getLocalizacoes(req, res, db));
app.get("/reservasAtrasadas", (req, res) =>
  main.getReservasByAtrasadas(req, res, db)
);
app.get("/reservasAtivas", (req, res) => main.getReservasByAtivo(req, res, db));
app.post("/notificacoes", (req, res) => main.getNotificacoesUser(req, res, db));
app.delete("/apaga/notificacao", (req, res) =>
  main.deleteNotificacao(req, res, db)
);
app.post("/reservasAtrasadasUser", (req, res) =>
  main.getReservasByAtrasadasUser(req, res, db)
);
app.get("/reservasSalaInativas", (req, res) =>
  main.getReservasSalaByInativo(req, res, db)
);
app.post("/reservasUsuarioEmpresa", (req, res) =>
  main.getReservasByUsuarioEmpresa(req, res, db)
);
app.post("/empresaNameByUser", (req, res) =>
  main.getEmpresaNameByUser(req, res, db)
);
app.post("/reservasSalaEmpresaPeriodo", (req, res) =>
  main.getReservasSalaByEmpresaPeriodo(req, res, db)
);
app.put("/cancela/reservaSala", (req, res) =>
  main.putCancelaReservaSala(req, res, db)
);
app.post("/reservasEmpresaPeriodo", (req, res) =>
  main.getReservasByEmpresaPeriodo(req, res, db)
);
app.put("/cancela/reserva", (req, res) => main.putCancelaReserva(req, res, db));
app.put("/inativa/item", (req, res) => main.putInativaItem(req, res, db));
app.post("/oneUserInfo", (req, res) => main.getOneUserInfo(req, res, db));
app.put("/update/usuarioSimple", (req, res) =>
  main.putUpdateUsuarioSimple(req, res, db)
);
app.post("/novo/usuarioPend", (req, res) =>
  main.postNewUsuarioPend(req, res, db)
);
app.get("/usuariosPend", (req, res) => main.getUsersPend(req, res, db));
app.delete("/apaga/userPend", (req, res) =>
  main.deleteUsuarioPend(req, res, db)
);
app.get("/empresasCadastro", (req, res) =>
  main.getEmpresasCadastro(req, res, db)
);
app.post("/checkEmail", (req, res) =>
  main.validarEmailExistente(req, res, db)
);
app.post("/relatorio101", (req, res) => main.relatorio101(req, res, db));
app.post("/relatorio103", (req, res) => main.relatorio103(req, res, db));
app.get("/relatorio104", (req, res) => main.relatorio104(req, res, db));
app.post("/relatorio105", (req, res) => main.relatorio105(req, res, db));
app.post("/relatorio106", (req, res) => main.relatorio106(req, res, db));
app.post("/relatorio201", (req, res) => main.relatorio201(req, res, db));
app.post("/relatorio202", (req, res) => main.relatorio202(req, res, db));
app.post("/relatorio203", (req, res) => main.relatorio203(req, res, db));
app.post("/relatorio204", (req, res) => main.relatorio204(req, res, db));
app.post("/relatorio205", (req, res) => main.relatorio205(req, res, db));
app.post("/relatorio301", (req, res) => main.relatorio301(req, res, db));
app.post("/relatorio401", (req, res) => main.relatorio401(req, res, db));
app.post("/relatorio402", (req, res) => main.relatorio402(req, res, db));
app.post("/relatorio403", (req, res) => main.relatorio403(req, res, db));
app.post("/relatorio404", (req, res) => main.relatorio404(req, res, db));
app.post("/relatorio405", (req, res) => main.relatorio405(req, res, db));
app.post("/relatorio406", (req, res) => main.relatorio406(req, res, db));
app.post("/relatorio407", (req, res) => main.relatorio407(req, res, db));
app.post("/relatorio408", (req, res) => main.relatorio408(req, res, db));

// App Server Connection
app.listen(process.env.PORT || 3002, () => {
  console.log(`Rodando aplicação na porta: ${process.env.PORT || 3002}`);
});
