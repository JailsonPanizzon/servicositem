const getItensQtd = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email)
      .then(auth => {
        if (auth.status === 400) {
          db("item").count("cod")
            .then(response => {
              if (response.length) {
                resolve(res.json(response[0].count));
              } else {
                resolve(res.json({ dataExists: "false" }));
              }
            })
            .catch(err => {
              console.log(err)
              reject(res.status(400).json({ dbError: "db error" }))
            }
            );
        } else {
          resolve(res.json(auth));
        }
      })
      .catch(err => {
        resolve(res.json(err));
      });
  });
const getItens = (req, res, db) =>
  new Promise((resolve, reject) => {
    let max = req.headers.qtd
    authorization(db, req.headers.authorization, req.headers.email)
      .then(auth => {
        if (auth.status === 400) {
          db.select("*")
            .from("item").orderBy('descricao').limit(max).offset(1)
            .then(items => {
              if (items.length) {
                resolve(res.json(items));
              } else {
                resolve(res.json({ dataExists: "false" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "db error" }))
            );
        } else {
          resolve(res.json(auth));
        }
      })
      .catch(err => {
        resolve(res.json(err));
      });
  });

const getSimpleItens = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.select("cod", "descricao")
            .from("item")
            .then(items => {
              if (items.length) {
                resolve(res.json(items));
              } else {
                resolve(res.json({ dataExists: "false" }));
              }
            });
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getTiposItens = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.select("*")
            .from("tipoitem")
            .then(tipos => {
              if (tipos.length) {
                resolve(res.json(tipos));
              } else {
                resolve(res.json({ dataExists: "false" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "db error" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getLocalizacoes = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.select("*")
            .from("localizacao")
            .then(loc => {
              if (loc.length) {
                resolve(res.json(loc));
              } else {
                resolve(res.json({ dataExists: "false" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "db error" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getReservados = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.select("*")
            .from("reserva")
            .then(tipos => {
              if (tipos.length) {
                resolve(res.json(tipos));
              } else {
                resolve(res.json({ dataExists: "false" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "db error" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getUsers = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.select(
            "cod",
            "nome",
            "email",
            "telefone",
            "isadmin",
            "logradouro",
            "numeroend",
            "bairro",
            "cidade",
            "uf",
            "empresa"
          )
            .from("usuario")
            .where("ativo", "=", true)
            .then(users => {
              if (users.length) {
                resolve(res.json(users));
              } else {
                resolve(res.json({ dbError: "não teve usuarios" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro ao pegar users" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getSalas = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.select("*")
            .from("sala")
            .then(salas => {
              if (salas.length) {
                resolve(res.json(salas));
              } else {
                resolve(res.json({ dbError: "não teve salas" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro ao pegar salas" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getEmpresas = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.select("*")
            .from("empresa")
            .then(emp => {
              if (emp.length) {
                resolve(res.json(emp));
              } else {
                resolve(res.json({ dbError: "não teve empresas" }));
              }
            })
            .catch(err =>
              reject(
                res.status(400).json({ dbError: "erro ao pegar empresas" })
              )
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });
const getEmpresasCadastro = (req, res, db) =>
  new Promise((resolve, reject) => {
    db.select("*")
      .from("empresa")
      .then(emp => {
        if (emp.length) {
          resolve(res.json(emp));
        } else {
          resolve(res.json({ dbError: "não teve empresas" }));
        }
      })
      .catch(err =>
        reject(res.status(400).json({ dbError: "erro ao pegar empresas" }))
      );
  });
const getOneItem = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          let { cod } = req.body;
          db.select("*")
            .from("item")
            .where("cod", "=", cod)
            .then(item => {
              if (item.length) {
                resolve(res.json(item));
              } else {
                resolve(res.json({ dbError: "não existe" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "nao deucerto" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getOneUser = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          let { cod } = req.body;
          db.select("*")
            .from("usuario")
            .where("cod", "=", cod)
            .then(user => {
              if (user.length) {
                resolve(res.json(user));
              } else {
                resolve(res.json({ dbError: "não existe" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "nao deucerto" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getItensBySala = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          let { sala } = req.body;
          db("item")
            .join("localizacao", "item.cod", "=", "localizacao.item")
            .select(
              "item.cod",
              "item.descricao",
              "item.tipoitem",
              "item.marca",
              "item.ativo"
            )
            .where("localizacao.sala", "=", sala)
            .then(itens => {
              if (itens.length) {
                resolve(res.json(itens));
              } else {
                resolve(
                  res.json({ dbError: "não tem nenhum item nessa sala" })
                );
              }
            })
            .catch(err => reject(res.status(400).json({ dbError: "nao deu" })));
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getTipoItens = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.select("*")
            .from("tipoitem")
            .then(tipoitems => {
              if (tipoitems.length) {
                resolve(res.json(tipoitems));
              } else {
                resolve(res.json({ dbError: "false" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "não pegou tipoitens" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getNextCodItem = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.max("cod")
            .from("item")
            .then(max => {
              resolve(res.json(max));
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "não pegou item" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getNextCodSala = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.max("cod")
            .from("sala")
            .then(max => {
              resolve(res.json(max));
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "não pegou nextsalacod" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const postNewItem = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { cod, descricao, tipoitem, marca, ativo } = req.body;
          db.select("descricao")
            .from("item")
            .where("cod", "=", cod)
            .then(items => {
              if (items.length) {
                resolve(res.status(400).json({ dbError: "ja existe" }));
              } else {
                const datacadastro = new Date().toLocaleDateString();
                db("item")
                  .insert({
                    cod,
                    descricao,
                    tipoitem,
                    datacadastro,
                    marca,
                    ativo
                  })
                  .returning("*")
                  .then(item => {
                    console.log(item);
                    res.json(item);
                  })
                  .catch(err =>
                    res.status(400).json({ dberror: "não inseriu item" })
                  );
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "não consultou item" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const postNewSala = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { cod, nome, descricao, disponivel } = req.body;
          db.select("nome")
            .from("sala")
            .where("cod", "=", cod)
            .then(salas => {
              if (salas.length) {
                resolve(res.status(400).json({ dbError: "ja existe" }));
              } else {
                db("sala")
                  .insert({ cod, nome, descricao, disponivel })
                  .returning("*")
                  .then(sala => {
                    console.log(sala);
                    res.json(sala);
                  })
                  .catch(err =>
                    res.status(400).json({ dberror: "não inseriu sala" })
                  );
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "não consultou sala" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getOneSala = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          let { cod } = req.body;
          db.select("*")
            .from("sala")
            .where("cod", "=", cod)
            .then(sala => {
              if (sala.length) {
                resolve(res.json(sala));
              } else {
                resolve(res.json({ dbError: "não existe" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "nao deucerto" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const postNewUsuario = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          let cod;
          const {
            nome,
            email,
            senha,
            telefone,
            isadmin,
            logradouro,
            numeroend,
            bairro,
            cidade,
            uf,
            empresa
          } = req.body;
          let ativo = true;
          db.max("cod")
            .from("usuario")
            .then(max => {
              cod = max[0].max + 1;
              db("usuario")
                .insert({
                  cod,
                  nome,
                  email,
                  senha,
                  telefone,
                  isadmin,
                  logradouro,
                  numeroend,
                  bairro,
                  cidade,
                  uf,
                  empresa,
                  ativo
                })
                .returning("*")
                .then(user => {
                  console.log(user);
                  res.json(user);
                })
                .catch(err =>
                  res.status(400).json({ dberror: "não inseriu usuario" })
                );
            })
            .catch(err =>
              reject(
                res.status(400).json({ dbError: "não pegou nextcodusuario" })
              )
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const putInativaUsuario = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { cod } = req.body;
          let ativo = false;
          console.log("INATIVANDO USUARIO: " + cod);
          db("usuario")
            .update({ ativo })
            .where("cod", "=", cod)
            .then(user => {
              console.log(user);
              res.json(user);
            })
            .catch(err =>
              res.status(400).json({ dberror: "não inativou usuario" })
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });
const generatetoken = (user, db) =>
  new Promise((resolve, reject) => {

    let token =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    console.log(token);
    db("usuario")
      .where("cod", "=", user.cod)
      .update({ token: token })
      .then(res => {
        resolve({ token: token, status: true });
      })
      .catch(err => {
        console.log(err);

        resolve({ token: null, status: false });
      });
  });
const authorization = (db, token, email) =>
  new Promise((resolve, reject) => {
    if (email == undefined || token == undefined || db == undefined) {
      resolve({ status: 405 });
    } else {
      db.select("email")
        .from("usuario")
        .where("email", "=", email)
        .where("token", "=", token)
        .then(response => {
          if (response[0].email == email) {
            console.log(response);
            resolve({ status: 400 });
          } else {
            resolve({ status: 401 });
          }
        })
        .catch(err => {
          resolve({ status: err });
        });
    }
  });

const postFazLogin = (req, res, db) =>
  new Promise((resolve, reject) => {

    const { email, senha } = req.body;
    db.select("*")
      .from("usuario")
      .where("email", "=", email)
      .then(userino => {
        if (userino.length) {
          if (userino[0].senha === senha) {
            if (userino[0].ativo) {
              generatetoken(userino[0], db).then(response => {
                if (res.status) {
                  userino[0].token = response.token;
                  resolve({ user: res.json(userino) });
                } else {
                  console.log("Falha ao gerar token de autenticação");

                  resolve(
                    res.json({
                      dbError: "Falha ao gerar token de autenticação"
                    })
                  );
                }
              });
            } else {
              resolve(res.json({ dbError: "usuario inativo" }));
            }
          } else {
            resolve(res.json({ dbError: "erro de autenticação" }));
          }
        } else {
          resolve(res.json({ dbError: "erro de autenticação" }));
        }
      })
      .catch(err =>
        reject(res.status(400).json({ dbError: "não pegou usuario" }))
      );
  });

const getAdminNome = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { cod } = req.body;
          db.select("nome", "isadmin")
            .from("usuario")
            .where("cod", "=", cod)
            .then(userino => {
              if (userino.length) {
                resolve(res.json(userino));
              } else {
                resolve(res.json({ dbError: "nao achei este usuário" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "não pegou usuario" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const postNewReserva = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { datainicio, datafim, usuario, item, empresa, obs } = req.body;
          if (datafim == 0) {
            let ativo = true, status = 1, cod;
            db.max("cod")
              .from("reserva")
              .then(max => {
                cod = max[0].max + 1;
                db("reserva")
                  .insert({
                    cod,
                    datainicio,
                    ativo,
                    usuario,
                    item,
                    empresa,
                    obs,
                    status
                  })
                  .returning("*")
                  .then(reserva => {
                    console.log(reserva);
                    insertNewNotificacao(0, "NOVARESERVA", cod, "0", db);
                    res.json(reserva);
                  })
                  .catch(err =>
                    res.status(400).json({ dberror: "não inseriu reserva" })
                  );
              })
              .catch(err =>
                reject(
                  res.status(400).json({ dbError: "não pegou nextcodreserva" })
                )
              );
          } else {
            let ativo = true, status = 1, cod;
            db.max("cod")
              .from("reserva")
              .then(max => {
                cod = max[0].max + 1;
                db("reserva")
                  .insert({
                    cod,
                    datainicio,
                    datafim,
                    ativo,
                    usuario,
                    item,
                    empresa,
                    obs,
                    status
                  })
                  .returning("*")
                  .then(reserva => {
                    console.log(reserva);
                    insertNewNotificacao(0, "NOVARESERVA", cod, "0", db);
                    res.json(reserva);
                  })
                  .catch(err =>
                    res.status(400).json({ dberror: "não inseriu reserva" })
                  );
              })
              .catch(err =>
                reject(
                  res.status(400).json({ dbError: "não pegou nextcodreserva" })
                )
              );
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const postNewReservaSala = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const {
            sala,
            datahorainicio,
            datahorafim,
            usuario,
            empresa,
            obs
          } = req.body;
          console.log(req.body);
          let ativo = true,
            cod;
          db.max("cod")
            .from("reservasala")
            .then(max => {
              cod = max[0].max + 1;
              db("reservasala")
                .insert({
                  cod,
                  sala,
                  datahorainicio,
                  datahorafim,
                  usuario,
                  ativo,
                  empresa,
                  obs
                })
                .returning("*")
                .then(reserva => {
                  console.log(reserva);
                  res.json(reserva);
                })
                .catch(err =>
                  res.status(400).json({ dberror: "não inseriu reservasala" })
                );
            })
            .catch(err =>
              reject(
                res
                  .status(400)
                  .json({ dbError: "não pegou nextcodreservasala" })
              )
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const postNewLocalizacao = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { item, sala } = req.body;
          db.select("*")
            .from("localizacao")
            .where("item", "=", item)
            .then(resp => {
              if (resp.length) {
                db("localizacao")
                  .update({ sala })
                  .where("item", "=", item)
                  .then(result => {
                    res.json(result);
                  })
                  .catch(err =>
                    res
                      .status(400)
                      .json({ dberror: "não atualizou localização" })
                  );
              } else {
                db("localizacao")
                  .insert({ item, sala })
                  .returning("*")
                  .then(result => {
                    res.json(result);
                  })
                  .catch(err =>
                    res.status(400).json({ dberror: "não inseriu localização" })
                  );
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "nao deu certo" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const putUpdateItem = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { oldcod, cod, descricao, tipoitem, marca, ativo } = req.body;
          if (oldcod == cod) {
            db("item")
              .update({ cod, descricao, tipoitem, marca, ativo })
              .where("cod", "=", oldcod)
              .then(item => {
                console.log(item);
                res.json(item);
              })
              .catch(err =>
                res.status(400).json({ dberror: "não atualizou item" })
              );
          } else {
            db.select("descricao")
              .from("item")
              .where("cod", "=", cod)
              .then(item => {
                if (item.length) {
                  resolve(res.status(400).json({ dbError: "ja existe" }));
                } else {
                  db("item")
                    .update({ cod, descricao, tipoitem, marca, ativo })
                    .where("cod", "=", oldcod)
                    .then(item => {
                      console.log(item);
                      res.json(item);
                    })
                    .catch(err =>
                      res.status(400).json({ dberror: "não atualizou item" })
                    );
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "não consultou item" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const putUpdateSala = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { oldcod, cod, nome, descricao, disponivel } = req.body;
          if (oldcod == cod) {
            db("sala")
              .update({ cod, nome, descricao, disponivel })
              .where("cod", "=", oldcod)
              .then(sala => {
                console.log(sala);
                res.json(sala);
              })
              .catch(err =>
                res.status(400).json({ dberror: "não atualizou sala" })
              );
          } else {
            db.select("nome")
              .from("sala")
              .where("cod", "=", cod)
              .then(sala => {
                if (sala.length) {
                  resolve(res.status(400).json({ dbError: "ja existe" }));
                } else {
                  db("sala")
                    .update({ cod, nome, descricao, disponivel })
                    .where("cod", "=", oldcod)
                    .then(sala => {
                      console.log(sala);
                      res.json(sala);
                    })
                    .catch(err =>
                      res.status(400).json({ dberror: "não atualizou sala" })
                    );
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "não consultou sala" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const putUpdateUsuario = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const {
            cod,
            nome,
            email,
            senha,
            telefone,
            isadmin,
            logradouro,
            numeroend,
            bairro,
            cidade,
            uf,
            empresa
          } = req.body;
          db("usuario")
            .update({
              nome,
              email,
              senha,
              telefone,
              isadmin,
              logradouro,
              numeroend,
              bairro,
              cidade,
              uf,
              empresa
            })
            .where("cod", "=", cod)
            .then(user => {
              console.log(user);
              res.json(user);
            })
            .catch(err =>
              res.status(400).json({ dberror: "não atualizou usuario" })
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const postNewTipoItem = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { descricao } = req.body;
          db.max("cod")
            .from("tipoitem")
            .then(max => {
              let cod = max[0].max + 1;
              db("tipoitem")
                .insert({ cod, descricao })
                .returning("*")
                .then(tipoitem => {
                  console.log(tipoitem);
                  res.json(tipoitem);
                })
                .catch(err =>
                  res.status(400).json({ dberror: "não inseriu tipoitem" })
                );
            })
            .catch(err =>
              reject(
                res.status(400).json({ dbError: "não pegou next tipoitem" })
              )
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const postNewEmpresa = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { nome } = req.body;
          db.max("cod")
            .from("empresa")
            .then(max => {
              let cod = max[0].max + 1;
              db("empresa")
                .insert({ cod, nome })
                .returning("*")
                .then(emp => {
                  console.log(emp);
                  res.json(emp);
                })
                .catch(err =>
                  res.status(400).json({ dberror: "não inseriu empresa" })
                );
            })
            .catch(err =>
              reject(
                res.status(400).json({ dbError: "não pegou next codEmpresa" })
              )
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getSalasReservadas = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          authorization(db, req.headers.authorization, req.headers.email).then(
            auth => {
              if (auth.status === 400) {
                db.select("*")
                  .from("reservasala")
                  .where("ativo", "=", true)
                  .then(salas => {
                    if (salas.length) {
                      resolve(res.json(salas));
                    } else {
                      resolve(res.json({ dataExists: "false" }));
                    }
                  })
                  .catch(err =>
                    reject(res.status(400).json({ dbError: "db error" }))
                  );
              } else {
                resolve(res.json(auth));
              }
            }
          );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });
const getReservasSalaByDia = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { sala, datahorainicio } = req.body;
          let dataMax = datahorainicio + " 23:59:59",
            dataMin = datahorainicio + " 00:00:00";
          db.select("*")
            .from("reservasala")
            .where("ativo", "=", true)
            .andWhere("sala", "=", sala)
            .andWhereBetween("datahorainicio", [dataMin, dataMax])
            .orderBy("datahorainicio")
            .then(reservas => {
              if (reservas.length) {
                resolve(res.json(reservas));
              } else {
                resolve(res.json({ dataExists: "não tem nenhuma" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getReservasSalaByPeriodo = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { sala, datahorainicio, datahorafim } = req.body;
          db.select("*")
            .from("reservasala")
            .where("ativo", "=", true)
            .andWhere("sala", "=", sala)
            .andWhere("datahorainicio", ">=", datahorainicio)
            .andWhere("datahorafim", "<=", datahorafim)
            .orderBy("datahorainicio")
            .then(reservas => {
              if (reservas.length) {
                resolve(res.json(reservas));
              } else {
                resolve(res.json({ dataExists: "não tem nenhuma" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const putInativaReservaSala = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { cod, comentario } = req.body;
          let ativo = false;
          console.log("INATIVANDO RESERVASALA: " + cod);
          db.select("empresa")
            .from("reservasala")
            .where("cod", "=", cod)
            .then(reservas => {
              db("reservasala")
                .update({ ativo })
                .where("cod", "=", cod)
                .then(rev => {
                  console.log(rev);
                  insertNewNotificacao(
                    reservas[0].empresa,
                    "REJEITARESERVASALA",
                    cod,
                    comentario,
                    db
                  );
                  res.json(rev);
                })
                .catch(err =>
                  res.status(400).json({ dberror: "não inativou reservasala" })
                );
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const putCancelaReservaSala = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { cod } = req.body;
          let ativo = false;
          console.log("INATIVANDO RESERVASALA: " + cod);
          db("reservasala")
            .update({ ativo })
            .where("cod", "=", cod)
            .then(rev => {
              res.json(rev);
            })
            .catch(err =>
              res.status(400).json({ dberror: "não inativou reservasala" })
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getReservasByEmpresa = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { empresa, datainicio, datafim } = req.body;
          if (datafim === null) {
            db.select("*")
              .from("reserva")
              .where("ativo", "=", true)
              .andWhere("status", "=", 2)
              .andWhere("empresa", "=", empresa)
              .andWhere("datainicio", ">=", datainicio)
              .orderBy("datainicio")
              .then(reservas => {
                if (reservas.length) {
                  resolve(res.json(reservas));
                } else {
                  resolve(res.json({ dataExists: "não tem nenhuma" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "erro fatal" }))
              );
          } else {
            db.select("*")
              .from("reserva")
              .where("ativo", "=", true)
              .andWhere("status", "=", 2)
              .andWhere("empresa", "=", empresa)
              .andWhere("datainicio", ">=", datainicio)
              .andWhere("datafim", "<=", datafim)
              .orderBy("datainicio")
              .then(reservas => {
                if (reservas.length) {
                  resolve(res.json(reservas));
                } else {
                  resolve(res.json({ dataExists: "não tem nenhuma" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "erro fatal" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getReservasByPeriodo = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { datainicio, datafim } = req.body;
          if (datafim === null) {
            db.select("*")
              .from("reserva")
              .where("ativo", "=", true)
              .andWhere("status", "=", 2)
              .andWhere("datainicio", ">=", datainicio)
              .orderBy("datainicio")
              .then(reservas => {
                if (reservas.length) {
                  resolve(res.json(reservas));
                } else {
                  resolve(res.json({ dataExists: "não tem nenhuma" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "erro fatal" }))
              );
          } else {
            db.select("*")
              .from("reserva")
              .where("ativo", "=", true)
              .andWhere("status", "=", 2)
              .andWhere("datainicio", ">=", datainicio)
              .andWhere("datafim", "<=", datafim)
              .orderBy("datainicio")
              .then(reservas => {
                if (reservas.length) {
                  resolve(res.json(reservas));
                } else {
                  resolve(res.json({ dataExists: "não tem nenhuma" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "erro fatal" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getReservasByAtrasadas = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          let date = new Date().toLocaleDateString();
          db.select("*")
            .from("reserva")
            .where("ativo", "=", true)
            .andWhere("datafim", "<", date)
            .andWhere("status", "=", 2)
            .orderBy("datainicio")
            .then(reservas => {
              if (reservas.length) {
                resolve(res.json(reservas));
              } else {
                resolve(res.json({ dataExists: "não tem nenhuma" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getReservasByAtrasadasUser = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { user } = req.body;
          db.select("empresa")
            .from("usuario")
            .where("cod", "=", user)
            .then(user => {
              let date = new Date().toLocaleDateString();
              db.select("*")
                .from("reserva")
                .where("ativo", "=", true)
                .andWhere("datafim", "<", date)
                .andWhere("status", "=", 2)
                .andWhere("empresa", "=", user[0].empresa)
                .orderBy("datainicio")
                .then(reservas => {
                  if (reservas.length) {
                    resolve(res.json(reservas));
                  } else {
                    resolve(res.json({ dataExists: "não tem nenhuma" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "erro fatal" }))
                );
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const putInativaReserva = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { cod } = req.body;
          let ativo = false;
          console.log("INATIVANDO RESERVA: " + cod);
          db.select("empresa")
            .from("reserva")
            .where("cod", "=", cod)
            .then(reservas => {
              db("reserva")
                .update({ ativo })
                .where("cod", "=", cod)
                .then(rev => {
                  db("notificacao")
                    .where("dados", "=", cod)
                    .del()
                    .then(result => {
                      console.log(result);
                      insertNewNotificacao(
                        reservas[0].empresa,
                        "DEVOLVIDARESERVA",
                        cod,
                        "Sua reserva foi marcada como Devolvida",
                        db
                      );
                    })
                    .catch(err => console.log("nao deu de apagar notificacao"));
                  console.log(rev);
                  res.json(rev);
                })
                .catch(err =>
                  res.status(400).json({ dberror: "não inativou reserva" })
                );
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const putMudaStatusReserva = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          let { cod, status, comentario } = req.body;
          let evento;
          if (status === -1) {
            evento = "REJEITARESERVA";
          } else if (status === 2) {
            evento = "CONCLUIRESERVA";
            comentario = "Entrega Efetuada";
          }
          db.select("empresa")
            .from("reserva")
            .where("cod", "=", cod)
            .then(reservas => {
              db("reserva")
                .update({ status })
                .where("cod", "=", cod)
                .then(rev => {
                  db("notificacao")
                    .where("dados", "=", cod)
                    .del()
                    .then(result => {
                      console.log(result);
                      insertNewNotificacao(
                        reservas[0].empresa,
                        evento,
                        cod,
                        comentario,
                        db
                      );
                    })
                    .catch(err => console.log("nao deu de apagar notificacao"));
                  console.log(rev);
                  res.json(rev);
                })
                .catch(err =>
                  res
                    .status(400)
                    .json({ dberror: "não atualizou status reserva" })
                );
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getReservasByEmpresaStatus = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { emp, status } = req.body;
          if (emp == -1) {
            db.select("*")
              .from("reserva")
              .where("ativo", "=", true)
              .andWhere("status", "=", status)
              .then(reservas => {
                if (reservas.length) {
                  resolve(res.json(reservas));
                } else {
                  resolve(res.json({ dataExists: "não tem nenhuma" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "erro fatal" }))
              )
          } else {
            db.select("*")
              .from("reserva")
              .where("ativo", "=", true)
              .andWhere("empresa", "=", emp)
              .andWhere("status", "=", status)
              .then(reservas => {
                if (reservas.length) {
                  resolve(res.json(reservas));
                } else {
                  resolve(res.json({ dataExists: "não tem nenhuma" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "erro fatal" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const insertNewNotificacao = (empresa, evento, dados, comentario, db) => {
  db.max("cod")
    .from("notificacao")
    .then(max => {
      let cod = max[0].max + 1,
        datanotif = new Date();
      db("notificacao")
        .insert({ cod, empresa, evento, dados, comentario, datanotif })
        .returning("*")
        .then(notif => {
          console.log("**********************\nnotificacao inserida!");
        })
        .catch(err =>
          console.log(
            "*********************\nnao inseriu notificacao: " + err
          )
        );
    })
    .catch(err =>
      console.log("*********************\ncant get nextcodnotif: " + err)
    );
};

const getNotificacoesUser = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { user } = req.body;
          db.select("empresa")
            .from("usuario")
            .where("cod", "=", user)
            .then(user => {
              db.select("*")
                .from("notificacao")
                .where("empresa", "=", user[0].empresa)
                .orderBy("datanotif")
                .then(notif => {
                  if (notif.length) {
                    resolve(res.json(notif));
                  } else {
                    resolve(res.json({ dataExists: "não tem nenhuma" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "erro fatal" }))
                );
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getReservasByAtivo = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.select("*")
            .from("reserva")
            .where("ativo", "=", true)
            .then(rev => {
              if (rev.length) {
                resolve(res.json(rev));
              } else {
                resolve(res.json({ dataExists: "não tem nenhuma" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getReservasByUsuarioEmpresa = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { user } = req.body;
          db.select("empresa")
            .from("usuario")
            .where("cod", "=", user)
            .then(user => {
              db.select("*")
                .from("reserva")
                .where("empresa", "=", user[0].empresa)
                .then(rev => {
                  if (rev.length) {
                    resolve(res.json(rev));
                  } else {
                    resolve(res.json({ dataExists: "não tem nenhuma" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "erro fatal" }))
                );
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getEmpresaNameByUser = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { user } = req.body;
          db.select("empresa")
            .from("usuario")
            .where("cod", "=", user)
            .then(user => {
              db.select("cod", "nome")
                .from("empresa")
                .where("cod", "=", user[0].empresa)
                .then(rev => {
                  if (rev.length) {
                    resolve(res.json(rev));
                  } else {
                    resolve(res.json({ dataExists: "não tem nenhuma" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "erro fatal" }))
                );
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getReservasSalaByInativo = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.select("*")
            .from("reservasala")
            .where("ativo", "=", false)
            .then(rev => {
              if (rev.length) {
                resolve(res.json(rev));
              } else {
                resolve(res.json({ dataExists: "não tem nenhuma" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const deleteNotificacao = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { cod } = req.body;
          db("notificacao")
            .where("cod", "=", cod)
            .del()
            .then(() => {
              resolve(res.json({ delete: true }));
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "nao deu de apagar" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getReservasSalaByEmpresaPeriodo = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { empresa, datahorainicio, datahorafim } = req.body;
          db.select("*")
            .from("reservasala")
            .where("ativo", "=", true)
            .andWhere("empresa", "=", empresa)
            .andWhere("datahorainicio", ">=", datahorainicio)
            .andWhere("datahorafim", "<=", datahorafim)
            .orderBy("datahorainicio")
            .then(reservas => {
              if (reservas.length) {
                resolve(res.json(reservas));
              } else {
                resolve(res.json({ dataExists: "não tem nenhuma" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getReservasByEmpresaPeriodo = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { empresa, datainicio, datafim, status } = req.body;
          console.log(req.body);
          if (datafim === null) {
            if (status == -3) {
              db.select("*")
                .from("reserva")
                .andWhere("empresa", "=", empresa)
                .andWhere("datainicio", ">=", datainicio)
                .orderBy("datainicio")
                .then(reservas => {
                  if (reservas.length) {
                    resolve(res.json(reservas));
                  } else {
                    resolve(res.json({ dataExists: "não tem nenhuma" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "erro fatal" }))
                );
            } else if (status == -2) {
              db.select("*")
                .from("reserva")
                .andWhere("empresa", "=", empresa)
                .andWhere("datainicio", ">=", datainicio)
                .andWhereBetween("status", [0, 1])
                .orderBy("datainicio")
                .then(reservas => {
                  if (reservas.length) {
                    resolve(res.json(reservas));
                  } else {
                    resolve(res.json({ dataExists: "não tem nenhuma" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "erro fatal" }))
                );
            } else if (status == -4) {
              db.select("*")
                .from("reserva")
                .andWhere("empresa", "=", empresa)
                .andWhere("ativo", "=", false)
                .andWhere("datainicio", ">=", datainicio)
                .andWhere("status", "=", 2)
                .orderBy("datainicio")
                .then(reservas => {
                  if (reservas.length) {
                    resolve(res.json(reservas));
                  } else {
                    resolve(res.json({ dataExists: "não tem nenhuma" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "erro fatal" }))
                );
            } else {
              db.select("*")
                .from("reserva")
                .andWhere("empresa", "=", empresa)
                .andWhere("ativo", "=", true)
                .andWhere("datainicio", ">=", datainicio)
                .andWhere("status", "=", status)
                .orderBy("datainicio")
                .then(reservas => {
                  if (reservas.length) {
                    resolve(res.json(reservas));
                  } else {
                    resolve(res.json({ dataExists: "não tem nenhuma" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "erro fatal" }))
                );
            }
          } else {
            if (status == -3) {
              db.select("*")
                .from("reserva")
                .andWhere("empresa", "=", empresa)
                .andWhere("datainicio", ">=", datainicio)
                .andWhere("datafim", "<=", datafim)
                .orderBy("datainicio")
                .then(reservas => {
                  if (reservas.length) {
                    resolve(res.json(reservas));
                  } else {
                    resolve(res.json({ dataExists: "não tem nenhuma" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "erro fatal" }))
                );
            } else if (status == -2) {
              db.select("*")
                .from("reserva")
                .andWhere("empresa", "=", empresa)
                .andWhere("datainicio", ">=", datainicio)
                .andWhere("datafim", "<=", datafim)
                .andWhereBetween("status", [0, 1])
                .orderBy("datainicio")
                .then(reservas => {
                  if (reservas.length) {
                    resolve(res.json(reservas));
                  } else {
                    resolve(res.json({ dataExists: "não tem nenhuma" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "erro fatal" }))
                );
            } else if (status == -4) {
              db.select("*")
                .from("reserva")
                .andWhere("empresa", "=", empresa)
                .andWhere("ativo", "=", false)
                .andWhere("datainicio", ">=", datainicio)
                .andWhere("datafim", "<=", datafim)
                .andWhere("status", "=", 2)
                .orderBy("datainicio")
                .then(reservas => {
                  if (reservas.length) {
                    resolve(res.json(reservas));
                  } else {
                    resolve(res.json({ dataExists: "não tem nenhuma" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "erro fatal" }))
                );
            } else {
              db.select("*")
                .from("reserva")
                .andWhere("empresa", "=", empresa)
                .andWhere("datainicio", ">=", datainicio)
                .andWhere("datafim", "<=", datafim)
                .andWhere("status", "=", status)
                .orderBy("datainicio")
                .then(reservas => {
                  if (reservas.length) {
                    resolve(res.json(reservas));
                  } else {
                    resolve(res.json({ dataExists: "não tem nenhuma" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "erro fatal" }))
                );
            }
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const putCancelaReserva = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { cod } = req.body;
          let ativo = false;
          console.log("CANCELANDO RESERVA: " + cod);
          db("reserva")
            .update({ ativo })
            .where("cod", "=", cod)
            .then(rev => {
              res.json(rev);
              db("notificacao")
                .where("dados", "=", cod)
                .andWhere("empresa", "=", 0)
                .del()
                .then(result => {
                  console.log(result);
                })
                .catch(err => console.log("nao deu de apagar notificacao"));
            })
            .catch(err =>
              res.status(400).json({ dberror: "não inativou reserva" })
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const putInativaItem = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { cod } = req.body;
          let ativo = false;
          //pegando reservas em que o item pode estar contido
          db.select("*")
            .from("reserva")
            .where("item", "=", cod)
            .andWhereBetween("status", [0, 2])
            .andWhere("ativo", "=", true)
            .then(reservas => {
              if (reservas.length) {
                //recusando o pedido
                resolve(res.json({ requestResult: "impossivel inativar" }));
              } else {
                //inativando o item
                db("item")
                  .update({ ativo })
                  .where("cod", "=", cod)
                  .then(rev => {
                    resolve(res.json({ requestResult: "sucesso" }));
                  })
                  .catch(err =>
                    res.status(400).json({ dberror: "não inativou item" })
                  );
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "erro fatal" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const getOneUserInfo = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          let { cod } = req.body;
          db("usuario")
            .join("empresa", "usuario.empresa", "=", "empresa.cod")
            .select(
              "usuario.cod as cod",
              "usuario.nome as nome",
              "usuario.email as email",
              "usuario.senha as senha",
              "empresa.nome as empresaNome",
              "usuario.telefone as telefone",
              "usuario.logradouro as logradouro",
              "usuario.numeroend as numeroend",
              "usuario.bairro as bairro"
            )
            .where("usuario.cod", "=", cod)
            .then(user => {
              if (user.length) {
                resolve(res.json(user));
              } else {
                resolve(res.json({ dbError: "não existe" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "nao deucerto" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const putUpdateUsuarioSimple = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const {
            cod,
            nome,
            email,
            senha,
            telefone,
            logradouro,
            numeroend,
            bairro
          } = req.body;
          db("usuario")
            .update({
              nome,
              email,
              senha,
              telefone,
              logradouro,
              numeroend,
              bairro
            })
            .where("cod", "=", cod)
            .then(user => {
              res.json(user);
            })
            .catch(err =>
              res.status(400).json({ dberror: "não atualizou usuario" })
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const validarEmailExistente = (req, res, db) =>
  new Promise((resolve, reject) => {
    const { email } = req.body;
    db.select("email")
      .from("usuario").where('email', '=', email)
      .then(users => {
        if (users.length) {
          resolve(res.json({ resultado: true }));
        } else {
          resolve(res.json({ resultado: false }));
        }
      })
      .catch(err =>
        reject(res.status(400).json({ dbError: "erro ao pegar users" }))
      );
  });

const postNewUsuarioPend = (req, res, db) =>
  new Promise((resolve, reject) => {
    let cod;
    const {
      nome,
      email,
      senha,
      telefone,
      logradouro,
      numeroend,
      bairro,
      cidade,
      uf,
      empresa
    } = req.body;
    db.max("cod")
      .from("usuariopend")
      .then(max => {
        cod = max[0].max + 1;
        db("usuariopend")
          .insert({
            cod,
            nome,
            email,
            senha,
            telefone,
            logradouro,
            numeroend,
            bairro,
            cidade,
            uf,
            empresa
          })
          .returning("*")
          .then(user => {
            insertNewNotificacao(0, "NEWUSERPEND", cod, "New User", db);
            res.json(user);
          })
          .catch(err =>
            res.status(400).json({ dberror: "não inseriu usuariopend" })
          );
      })
      .catch(err =>
        reject(
          res
            .status(400)
            .json({ dbError: "não pegou nextcodusuariopend" })
        )
      );
  });

const getUsersPend = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          db.select("*")
            .from("usuariopend")
            .then(users => {
              if (users.length) {
                resolve(res.json(users));
              } else {
                resolve(res.json({ dbError: "não teve usuariospend" }));
              }
            })
            .catch(err =>
              reject(
                res.status(400).json({ dbError: "erro ao pegar userspend" })
              )
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const deleteUsuarioPend = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { cod, codN } = req.body;
          db("usuariopend")
            .where("cod", "=", cod)
            .del()
            .then(() => {
              resolve(res.json({ delete: true }));
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "nao deu de apagar" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const relatorio101 = (req, res, db) =>
  //retorna itens por ativo ou todos
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email)
      .then(auth => {
        if (auth.status === 400) {
          const { ativo } = req.body;
          if (ativo === 0) {
            db("item")
              .join('tipoitem', 'item.tipoitem', '=', 'tipoitem.cod')
              .select('item.cod as cod', 'item.descricao as descricao', 'tipoitem.descricao as tipoitem', 'item.datacadastro as datacadastro', 'item.marca as marca', 'item.ativo as ativo')
              .then(items => {
                if (items.length) {
                  resolve(res.json(items));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          } else {
            db("item")
              .join('tipoitem', 'item.tipoitem', '=', 'tipoitem.cod')
              .select('item.cod as cod', 'item.descricao as descricao', 'tipoitem.descricao as tipoitem', 'item.datacadastro as datacadastro', 'item.marca as marca', 'item.ativo as ativo')
              .where('ativo', '=', ativo)
              .then(items => {
                if (items.length) {
                  resolve(res.json(items));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      })
      .catch(err => {
        resolve(res.json(err));
      });
  });

const relatorio103 = (req, res, db) =>
  //retorna itens reservadospor empresa ou todos
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email)
      .then(auth => {
        if (auth.status === 400) {
          let dataAtual = new Date().toLocaleDateString();
          const { empresa } = req.body;
          if (empresa == -1) {
            db("reserva")
              .join('item', 'reserva.item', '=', 'item.cod')
              .select('item.cod as cod', 'item.descricao as descricao', 'reserva.datainicio as datainicio', 'reserva.datafim as datafim')
              .where("reserva.ativo", '=', true).andWhere('reserva.status', '=', 2).andWhere('reserva.datainicio', '<=', dataAtual)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          } else {
            db("reserva")
              .join('item', 'item.cod', '=', 'reserva.item')
              .select('item.cod as cod', 'item.descricao as descricao', 'reserva.datainicio as datainicio', 'reserva.datafim as datafim')
              .where("reserva.ativo", '=', true).andWhere('reserva.empresa', '=', empresa).andWhere('reserva.status', '=', 2).andWhere('reserva.datainicio', '<=', dataAtual)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      })
      .catch(err => {
        resolve(res.json(err));
      });
  });

const relatorio104 = (req, res, db) =>
  //retorna itens sem reserva
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email)
      .then(auth => {
        if (auth.status === 400) {
          let dataAtual = new Date().toLocaleDateString();
          db.select('item').from("reserva")
            .where("ativo", '=', true).andWhere('status', '=', 2).andWhere('datainicio', '<=', dataAtual)
            .then(itensRes => {
              if (itensRes.length) {
                db("item")
                  .select('cod', 'descricao')
                  .then(itens => {
                    let itensNRes = [], t;
                    itens.forEach(item => {
                      t = true;
                      itensRes.forEach(ir => {
                        if (item.cod === ir.item) {
                          t = false;
                        }
                      })
                      if (t) {
                        itensNRes.push(item);
                      }
                    });
                    resolve(res.json(itensNRes));
                  })
                  .catch(err =>
                    reject(res.status(400).json({ dbError: "db error" }))
                  );
              } else {
                db("item")
                  .select('cod', 'descricao')
                  .then(itens => {
                    resolve(res.json(itens));
                  })
                  .catch(err =>
                    reject(res.status(400).json({ dbError: "db error" }))
                  );
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "db error" }))
            );
        } else {
          resolve(res.json(auth));
        }
      })
      .catch(err => {
        resolve(res.json(err));
      });
  });

const relatorio105 = (req, res, db) =>
  //retorna itens reservadospor empresa ou todos
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email)
      .then(auth => {
        if (auth.status === 400) {
          const { empresa, dinit, dend } = req.body;
          if (empresa === '-1') {
            if (dend === -1) {
              db("reserva")
                .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
                .select('item.cod as cod', 'item.descricao as descricao', 'reserva.datainicio as datainicio', 'reserva.datafim as datafim', 'empresa.nome as empresa')
                .where("reserva.ativo", '=', true).andWhere('reserva.status', '=', 2).andWhere('reserva.datainicio', '>=', dinit)
                .then(respo => {
                  if (respo.length) {
                    resolve(res.json(respo));
                  } else {
                    resolve(res.json({ dataExists: "false" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "db error" }))
                );
            } else {
              db("reserva")
                .join('item', 'item.cod', '=', 'reserva.item').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
                .select('item.cod as cod', 'item.descricao as descricao', 'reserva.datainicio as datainicio', 'reserva.datafim as datafim', 'empresa.nome as empresa')
                .where("reserva.ativo", '=', true).andWhere('reserva.status', '=', 2).andWhere('reserva.datainicio', '>=', dinit).andWhere('reserva.datafim', '<=', dend)
                .then(respo => {
                  if (respo.length) {
                    resolve(res.json(respo));
                  } else {
                    resolve(res.json({ dataExists: "false" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "db error" }))
                );
            }
          } else {
            if (dend === -1) {
              db("reserva")
                .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
                .select('item.cod as cod', 'item.descricao as descricao', 'reserva.datainicio as datainicio', 'reserva.datafim as datafim', 'empresa.nome as empresa')
                .where("reserva.ativo", '=', true).andWhere('reserva.empresa', '=', empresa).andWhere('reserva.status', '=', 2).andWhere('reserva.datainicio', '>=', dinit)
                .then(respo => {
                  if (respo.length) {
                    resolve(res.json(respo));
                  } else {
                    resolve(res.json({ dataExists: "false" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "db error" }))
                );
            } else {
              db("reserva")
                .join('item', 'item.cod', '=', 'reserva.item').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
                .select('item.cod as cod', 'item.descricao as descricao', 'reserva.datainicio as datainicio', 'reserva.datafim as datafim', 'empresa.nome as empresa')
                .where("reserva.ativo", '=', true).andWhere('reserva.empresa', '=', empresa).andWhere('reserva.status', '=', 2).andWhere('reserva.datainicio', '>=', dinit).andWhere('reserva.datafim', '<=', dend)
                .then(respo => {
                  if (respo.length) {
                    resolve(res.json(respo));
                  } else {
                    resolve(res.json({ dataExists: "false" }));
                  }
                })
                .catch(err =>
                  reject(res.status(400).json({ dbError: "db error" }))
                );
            }
          }
        } else {
          resolve(res.json(auth));
        }
      })
      .catch(err => {
        resolve(res.json(err));
      });
  });

const relatorio106 = (req, res, db) =>
  //retorna itens por categoria
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email)
      .then(auth => {
        if (auth.status === 400) {
          const { cat } = req.body;
          db("item")
            .select('*').where('ativo', '=', true).andWhere('tipoitem', '=', cat)
            .then(items => {
              if (items.length) {
                resolve(res.json(items));
              } else {
                resolve(res.json({ dataExists: "false" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "db error" }))
            );
        } else {
          resolve(res.json(auth));
        }
      })
      .catch(err => {
        resolve(res.json(err));
      });
  });

const relatorio201 = (req, res, db) =>
  //retorna salas por disp ou todas
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email)
      .then(auth => {
        if (auth.status === 400) {
          const { disp } = req.body;
          if (disp === 0) {
            db("sala")
              .select('*')
              .then(salas => {
                if (salas.length) {
                  resolve(res.json(salas));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          } else {
            db("sala")
              .select('*').where('disponivel', '=', disp)
              .then(salas => {
                if (salas.length) {
                  resolve(res.json(salas));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      })
      .catch(err => {
        resolve(res.json(err));
      });
  });

const relatorio202 = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          let { sala } = req.body;
          db("item")
            .join("localizacao", "item.cod", "=", "localizacao.item").join('sala', 'sala.cod', '=', 'localizacao.sala')
            .select(
              "item.cod as cod",
              "item.descricao as descricao",
              "item.ativo as ativo",
              'sala.nome as sala'
            )
            .where("localizacao.sala", "=", sala)
            .then(itens => {
              if (itens.length) {
                resolve(res.json(itens));
              } else {
                resolve(
                  res.json({ dbError: "não tem nenhum item nessa sala" })
                );
              }
            })
            .catch(err => reject(res.status(400).json({ dbError: "nao deu" })));
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const relatorio203 = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          let { sala, dia } = req.body;
          let dataMax = dia + " 23:59:59", dataMin = dia + " 00:00:00";
          db("reservasala")
            .join('empresa', 'reservasala.empresa', '=', 'empresa.cod')
            .select(
              "empresa.nome as empresa",
              "reservasala.datahorainicio as datahorainicio",
              "reservasala.datahorafim as datahorafim",
              'reservasala.obs as obs',
            )
            .where("reservasala.sala", "=", sala).andWhere('reservasala.ativo', '=', true).andWhereBetween('reservasala.datahorainicio', [dataMin, dataMax]).orderBy('reservasala.datahorainicio')
            .then(ress => {
              if (ress.length) {
                resolve(res.json(ress));
              } else {
                resolve(
                  res.json({ dbError: "não tem nenhum item nessa sala" })
                );
              }
            })
            .catch(err => reject(res.status(400).json({ dbError: "nao deu" })));
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const relatorio204 = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          let { sala, d1, d2 } = req.body;
          console.log(req.body);

          db("reservasala")
            .join('empresa', 'reservasala.empresa', '=', 'empresa.cod')
            .select(
              "empresa.nome as empresa",
              "reservasala.datahorainicio as datahorainicio",
              "reservasala.datahorafim as datahorafim",
              'reservasala.obs as obs',
            )
            .where("reservasala.sala", "=", sala).andWhere('reservasala.ativo', '=', true).andWhere('reservasala.datahorainicio', '>=', d1 + " 00:00:00").andWhere('reservasala.datahorafim', '<=', d2 + " 23:59:59").orderBy('reservasala.datahorainicio')
            .then(ress => {
              if (ress.length) {
                resolve(res.json(ress));
              } else {
                resolve(
                  res.json({ dbError: "não tem nenhum item nessa sala" })
                );
              }
            })
            .catch(err => reject(res.status(400).json({ dbError: "nao deu" })));
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const relatorio205 = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          let { empresa } = req.body;
          let datual = new Date().toLocaleString();
          db("reservasala")
            .join('empresa', 'reservasala.empresa', '=', 'empresa.cod').join('sala', 'reservasala.sala', '=', 'sala.cod')
            .select(
              'sala.nome as sala',
              "reservasala.datahorainicio as datahorainicio",
              "reservasala.datahorafim as datahorafim",
              'reservasala.obs as obs',
            )
            .where("reservasala.empresa", "=", empresa).andWhere('reservasala.ativo', '=', true).andWhere('reservasala.datahorainicio', '>=', datual).orderBy('reservasala.datahorainicio')
            .then(ress => {
              if (ress.length) {
                resolve(res.json(ress));
              } else {
                resolve(
                  res.json({ dbError: "não tem nenhum item nessa sala" })
                );
              }
            })
            .catch(err => reject(res.status(400).json({ dbError: "nao deu" })));
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const relatorio301 = (req, res, db) =>
  //retorna salas por disp ou todas
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email)
      .then(auth => {
        if (auth.status === 400) {
          const { ativo } = req.body;
          if (ativo === 0) {
            db("usuario").join('empresa', 'usuario.empresa', '=', 'empresa.cod')
              .select('usuario.cod as cod', 'usuario.isadmin as isadmin', 'usuario.nome as nome', 'usuario.email as email', 'usuario.telefone as telefone', 'usuario.cidade as cidade', 'usuario.uf as uf', 'usuario.ativo as ativo', 'empresa.nome as empresa')
              .then(users => {
                if (users.length) {
                  resolve(res.json(users));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          } else {
            db("usuario").join('empresa', 'usuario.empresa', '=', 'empresa.cod')
              .select('usuario.cod as cod', 'usuario.isadmin as isadmin', 'usuario.nome as nome', 'usuario.email as email', 'usuario.telefone as telefone', 'usuario.cidade as cidade', 'usuario.uf as uf', 'usuario.ativo as ativo', 'empresa.nome as empresa')
              .where('ativo', '=', ativo)
              .then(users => {
                if (users.length) {
                  resolve(res.json(users));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      })
      .catch(err => {
        resolve(res.json(err));
      });
  });

const relatorio401 = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { empresa, datainicio, datafim } = req.body;
          if (empresa === '-1') {
            db("reserva")
              .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
              .select('reserva.datainicio as datainicio', 'item.descricao as item_desc', 'item.cod as item_cod', 'reserva.datafim as datafim', 'empresa.nome as empresa', 'reserva.ativo as ativo', 'reserva.status as status', 'reserva.obs as obs')
              .where('reserva.datainicio', '>=', datainicio).andWhere('reserva.datafim', '<=', datafim)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          } else {
            db("reserva")
              .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
              .select('reserva.datainicio as datainicio', 'item.descricao as item_desc', 'item.cod as item_cod', 'reserva.datafim as datafim', 'empresa.nome as empresa', 'reserva.ativo as ativo', 'reserva.status as status', 'reserva.obs as obs')
              .where('reserva.datainicio', '>=', datainicio).andWhere('reserva.datafim', '<=', datafim).andWhere('reserva.empresa', '=', empresa)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const relatorio402 = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { empresa } = req.body;
          let dataInicio = new Date().toLocaleDateString();
          db("reserva")
            .join('item', 'reserva.item', '=', 'item.cod')
            .select('reserva.datainicio as datainicio', 'item.descricao as item_desc', 'item.cod as item_cod', 'reserva.datafim as datafim', 'reserva.ativo as ativo', 'reserva.status as status', 'reserva.obs as obs')
            .where('reserva.datainicio', '>=', dataInicio).andWhere('reserva.empresa', '=', empresa)
            .then(respo => {
              if (respo.length) {
                resolve(res.json(respo));
              } else {
                resolve(res.json({ dataExists: "false" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "db error" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const relatorio403 = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { empresa, datainicio, datafim } = req.body;
          let dhi = datainicio + " 00:00:00", dhf = datafim + " 23:59:59";
          if (empresa === '-1') {
            db("reservasala")
              .join('sala', 'reservasala.sala', '=', 'sala.cod').join('empresa', 'reservasala.empresa', '=', 'empresa.cod')
              .select('reservasala.datahorainicio as datahorainicio', 'sala.nome as sala', 'reservasala.datahorafim as datahorafim', 'empresa.nome as empresa', 'reservasala.ativo as ativo', 'reservasala.obs as obs')
              .where('reservasala.datahorainicio', '>=', dhi).andWhere('reservasala.datahorafim', '<=', dhf)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          } else {
            db("reservasala")
              .join('sala', 'reservasala.sala', '=', 'sala.cod').join('empresa', 'reservasala.empresa', '=', 'empresa.cod')
              .select('reservasala.datahorainicio as datahorainicio', 'sala.nome as sala', 'reservasala.datahorafim as datahorafim', 'empresa.nome as empresa', 'reservasala.ativo as ativo', 'reservasala.obs as obs')
              .where('reservasala.datahorainicio', '>=', dhi).andWhere('reservasala.datahorafim', '<=', dhf).andWhere('reservasala.empresa', '=', empresa).orderBy('reservasala.datahorainicio', 'asc')
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const relatorio404 = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { status } = req.body;
          db("reserva")
            .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
            .select('reserva.datainicio as datainicio', 'item.descricao as item_desc', 'item.cod as item_cod', 'reserva.datafim as datafim', 'empresa.nome as empresa', 'reserva.status as status', 'reserva.obs as obs')
            .where("reserva.status", '=', status).andWhere('reserva.ativo', '=', true)
            .then(respo => {
              if (respo.length) {
                resolve(res.json(respo));
              } else {
                resolve(res.json({ dataExists: "false" }));
              }
            })
            .catch(err =>
              reject(res.status(400).json({ dbError: "db error" }))
            );
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const relatorio405 = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { empresa, datainicio } = req.body;
          if (empresa === '-1') {
            db("reserva")
              .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
              .select('reserva.datainicio as datainicio', 'item.descricao as item_desc', 'item.cod as item_cod', 'reserva.datafim as datafim', 'empresa.nome as empresa', 'reserva.ativo as ativo', 'reserva.status as status', 'reserva.obs as obs')
              .where('reserva.datainicio', '>=', datainicio).andWhere("reserva.status", '=', 2).andWhere('reserva.ativo', '=', true)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          } else {
            db("reserva")
              .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
              .select('reserva.datainicio as datainicio', 'item.descricao as item_desc', 'item.cod as item_cod', 'reserva.datafim as datafim', 'empresa.nome as empresa', 'reserva.ativo as ativo', 'reserva.status as status', 'reserva.obs as obs')
              .where('reserva.datainicio', '>=', datainicio).andWhere("reserva.status", '=', 2).andWhere('reserva.ativo', '=', true).andWhere('reserva.empresa', '=', empresa)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const relatorio406 = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { empresa, datainicio } = req.body;
          if (empresa === '-1') {
            db("reserva")
              .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
              .select('reserva.datainicio as datainicio', 'item.descricao as item_desc', 'item.cod as item_cod', 'reserva.datafim as datafim', 'empresa.nome as empresa', 'reserva.ativo as ativo', 'reserva.status as status', 'reserva.obs as obs')
              .where('reserva.datainicio', '>=', datainicio).andWhere("reserva.status", '=', -1)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          } else {
            db("reserva")
              .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
              .select('reserva.datainicio as datainicio', 'item.descricao as item_desc', 'item.cod as item_cod', 'reserva.datafim as datafim', 'empresa.nome as empresa', 'reserva.ativo as ativo', 'reserva.status as status', 'reserva.obs as obs')
              .where('reserva.datainicio', '>=', datainicio).andWhere("reserva.status", '=', -1).andWhere('reserva.empresa', '=', empresa)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const relatorio407 = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { empresa } = req.body;
          let dataFim = new Date().toLocaleDateString();
          if (empresa === '-1') {
            db("reserva")
              .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
              .select('reserva.datainicio as datainicio', 'item.descricao as item_desc', 'item.cod as item_cod', 'reserva.datafim as datafim', 'empresa.nome as empresa', 'reserva.ativo as ativo', 'reserva.status as status', 'reserva.obs as obs')
              .where('reserva.datafim', '<', dataFim).andWhere("reserva.status", '=', 2).andWhere('reserva.ativo', '=', true)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          } else {
            db("reserva")
              .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
              .select('reserva.datainicio as datainicio', 'item.descricao as item_desc', 'item.cod as item_cod', 'reserva.datafim as datafim', 'empresa.nome as empresa', 'reserva.ativo as ativo', 'reserva.status as status', 'reserva.obs as obs')
              .where('reserva.datafim', '<', dataFim).andWhere("reserva.status", '=', 2).andWhere('reserva.ativo', '=', true).andWhere('reserva.empresa', '=', empresa)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

const relatorio408 = (req, res, db) =>
  new Promise((resolve, reject) => {
    authorization(db, req.headers.authorization, req.headers.email).then(
      auth => {
        if (auth.status === 400) {
          const { empresa, datainicio } = req.body;
          if (empresa === '-1') {
            db("reserva")
              .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
              .select('reserva.datainicio as datainicio', 'item.descricao as item_desc', 'item.cod as item_cod', 'reserva.datafim as datafim', 'empresa.nome as empresa', 'reserva.ativo as ativo', 'reserva.status as status', 'reserva.obs as obs')
              .where('reserva.datainicio', '>=', datainicio).andWhere("reserva.status", '=', 2).andWhere('reserva.ativo', '=', false)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          } else {
            db("reserva")
              .join('item', 'reserva.item', '=', 'item.cod').join('empresa', 'reserva.empresa', '=', 'empresa.cod')
              .select('reserva.datainicio as datainicio', 'item.descricao as item_desc', 'item.cod as item_cod', 'reserva.datafim as datafim', 'empresa.nome as empresa', 'reserva.ativo as ativo', 'reserva.status as status', 'reserva.obs as obs')
              .where('reserva.datainicio', '>=', datainicio).andWhere("reserva.status", '=', 2).andWhere('reserva.ativo', '=', false).andWhere('reserva.empresa', '=', empresa)
              .then(respo => {
                if (respo.length) {
                  resolve(res.json(respo));
                } else {
                  resolve(res.json({ dataExists: "false" }));
                }
              })
              .catch(err =>
                reject(res.status(400).json({ dbError: "db error" }))
              );
          }
        } else {
          resolve(res.json(auth));
        }
      }
    );
  });

module.exports = {
  getItens,
  getTiposItens,
  getReservados,
  getNextCodItem,
  postNewItem,
  putUpdateItem,
  postNewTipoItem,
  getTipoItens,
  getOneItem,
  postNewReserva,
  getUsers,
  getEmpresas,
  postNewUsuario,
  putUpdateUsuario,
  getOneUser,
  postNewEmpresa,
  getSalas,
  getNextCodSala,
  getOneSala,
  postNewSala,
  putUpdateSala,
  postNewReservaSala,
  postFazLogin,
  getAdminNome,
  putInativaUsuario,
  getItensBySala,
  postNewLocalizacao,
  getSalasReservadas,
  getReservasSalaByDia,
  getReservasSalaByPeriodo,
  putInativaReservaSala,
  getSimpleItens,
  getReservasByEmpresa,
  getReservasByPeriodo,
  putInativaReserva,
  putMudaStatusReserva,
  getReservasByEmpresaStatus,
  getLocalizacoes,
  getReservasByAtrasadas,
  getNotificacoesUser,
  getReservasByAtivo,
  deleteNotificacao,
  getReservasByAtrasadasUser,
  getReservasSalaByInativo,
  getReservasByUsuarioEmpresa,
  getEmpresaNameByUser,
  getEmpresasCadastro,
  getReservasSalaByEmpresaPeriodo,
  putCancelaReservaSala,
  getReservasByEmpresaPeriodo,
  putCancelaReserva,
  putInativaItem,
  getOneUserInfo,
  putUpdateUsuarioSimple,
  postNewUsuarioPend,
  getUsersPend,
  deleteUsuarioPend,
  validarEmailExistente,
  getItensQtd,
  relatorio101,
  relatorio103,
  relatorio104,
  relatorio105,
  relatorio106,
  relatorio201,
  relatorio202,
  relatorio203,
  relatorio204,
  relatorio205,
  relatorio301,
  relatorio401,
  relatorio402,
  relatorio403,
  relatorio404,
  relatorio405,
  relatorio406,
  relatorio407,
  relatorio408
};
