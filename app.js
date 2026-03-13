const protocolos = {
  jp3: {
    nome: 'Jackson & Pollock 3 dobras',
    camposPorSexo: {
      masculino: ['peitoral', 'abdomen', 'coxa'],
      feminino: ['triceps', 'suprailiaca', 'coxa']
    },
    calcular: ({ sexo, idade, medidas }) => {
      const soma = somaCampos(medidas);
      const d = sexo === 'masculino'
        ? 1.112 - (0.00043499 * soma) + (0.00000055 * soma * soma) - (0.00028826 * idade)
        : 1.097 - (0.00046971 * soma) + (0.00000056 * soma * soma) - (0.00012828 * idade);
      return siri(d);
    }
  },
  jp4: {
    nome: 'Jackson & Pollock 4 dobras',
    campos: ['triceps', 'subescapular', 'suprailiaca', 'abdomen'],
    calcular: ({ sexo, idade, medidas }) => {
      const soma = somaCampos(medidas);
      const d = sexo === 'masculino'
        ? 1.10 - (0.0004 * soma) + (0.0000005 * soma * soma) - (0.00028 * idade)
        : 1.09 - (0.00045 * soma) + (0.0000005 * soma * soma) - (0.00013 * idade);
      return siri(d);
    }
  },
  jp7: {
    nome: 'Jackson & Pollock 7 dobras',
    campos: ['peitoral', 'axilarMedia', 'triceps', 'subescapular', 'abdomen', 'suprailiaca', 'coxa'],
    calcular: ({ sexo, idade, medidas }) => {
      const soma = somaCampos(medidas);
      const d = sexo === 'masculino'
        ? 1.112 - (0.00043499 * soma) + (0.00000055 * soma * soma) - (0.00028826 * idade)
        : 1.097 - (0.00046971 * soma) + (0.00000056 * soma * soma) - (0.00012828 * idade);
      return siri(d);
    }
  },
  slaughter: {
    nome: 'Slaughter 2 dobras (crianças/adolescentes)',
    campos: ['triceps', 'subescapular'],
    calcular: ({ sexo, medidas }) => {
      const s = (Number(medidas.triceps) || 0) + (Number(medidas.subescapular) || 0);
      if (sexo === 'masculino') {
        return 1.21 * s - 0.008 * s * s - 1.7;
      }
      return 1.33 * s - 0.013 * s * s - 2.5;
    }
  },
  petroski: {
    nome: 'Petroski (1995) - simplificado',
    campos: ['triceps', 'subescapular', 'suprailiaca', 'abdominal', 'circAbdominal', 'circQuadril'],
    calcular: ({ idade, peso, altura, medidas }) => {
      const somaDobras = ['triceps', 'subescapular', 'suprailiaca', 'abdominal']
        .reduce((acc, key) => acc + (Number(medidas[key]) || 0), 0);
      const imc = peso / ((altura / 100) ** 2);
      const d = 1.105 - (0.00042 * somaDobras) - (0.00025 * idade) + (0.00008 * imc);
      return siri(d);
    }
  },
  guedes: {
    nome: 'Guedes (1994) 3 dobras',
    camposPorSexo: {
      masculino: ['triceps', 'suprailiaca', 'abdomen'],
      feminino: ['subescapular', 'suprailiaca', 'coxa']
    },
    calcular: ({ sexo, medidas }) => {
      const soma = somaCampos(medidas);
      const d = sexo === 'masculino'
        ? 1.1714 - (0.0671 * Math.log10(Math.max(soma, 1)))
        : 1.1665 - (0.0706 * Math.log10(Math.max(soma, 1)));
      return siri(d);
    }
  },
  faulkner: {
    nome: 'Faulkner 4 dobras',
    campos: ['triceps', 'subescapular', 'suprailiaca', 'abdomen'],
    calcular: ({ medidas }) => {
      const soma = somaCampos(medidas);
      return (soma * 0.153) + 5.783;
    }
  },
  evans: {
    nome: 'Evans 3 dobras (atletas) - simplificado',
    campos: ['abdomen', 'coxa', 'triceps'],
    calcular: ({ idade, medidas }) => {
      const soma = somaCampos(medidas);
      const d = 1.11 - (0.0005 * soma) - (0.0002 * idade);
      return siri(d);
    }
  },
  peterson: {
    nome: 'Peterson 4 dobras - simplificado',
    campos: ['triceps', 'subescapular', 'suprailiaca', 'coxa'],
    calcular: ({ idade, peso, altura, medidas }) => {
      const soma = somaCampos(medidas);
      const imc = peso / ((altura / 100) ** 2);
      const d = 1.10 - (0.00045 * soma) - (0.0001 * idade) + (0.00005 * imc);
      return siri(d);
    }
  }
};

const protocoloSelect = document.getElementById('protocolo');
Object.entries(protocolos).forEach(([key, p]) => {
  const op = document.createElement('option');
  op.value = key;
  op.textContent = p.nome;
  protocoloSelect.appendChild(op);
});

document.getElementById('btn-sugerir').addEventListener('click', sugerirProtocolo);
document.getElementById('btn-avancar').addEventListener('click', montarCampos);
document.getElementById('form-protocolo').addEventListener('submit', calcularResultado);

function sugerirProtocolo() {
  const idade = Number(document.getElementById('idade').value);
  const contexto = document.getElementById('contexto').value;
  const perfil = document.getElementById('perfil').value;
  const populacao = document.getElementById('populacao').value;

  let sugestao = 'jp3';

  if (idade <= 17 || contexto === 'crianca') sugestao = 'slaughter';
  else if (perfil === 'atleta' || contexto === 'atleta') sugestao = 'evans';
  else if (populacao === 'brasileira') sugestao = 'petroski';
  else if (contexto === 'clinico') sugestao = 'jp7';

  protocoloSelect.value = sugestao;
  document.getElementById('sugestao').textContent = `Protocolo sugerido: ${protocolos[sugestao].nome}`;
}

function montarCampos() {
  const sexo = document.getElementById('sexo').value;
  const key = protocoloSelect.value;
  const protocolo = protocolos[key];
  const camposRoot = document.getElementById('campos-protocolo');

  const campos = protocolo.camposPorSexo ? protocolo.camposPorSexo[sexo] : protocolo.campos;

  camposRoot.innerHTML = '';
  campos.forEach((campo) => {
    const label = document.createElement('label');
    label.textContent = `${formatarNome(campo)} (mm)`;

    const input = document.createElement('input');
    input.type = 'number';
    input.name = campo;
    input.step = '0.1';
    input.required = true;

    label.appendChild(input);
    camposRoot.appendChild(label);
  });

  document.getElementById('step-2').classList.remove('hidden');
  document.getElementById('resultado').classList.add('hidden');
}

function calcularResultado(event) {
  event.preventDefault();

  const sexo = document.getElementById('sexo').value;
  const idade = Number(document.getElementById('idade').value);
  const peso = Number(document.getElementById('peso').value);
  const altura = Number(document.getElementById('altura').value);
  const key = protocoloSelect.value;
  const protocolo = protocolos[key];

  const medidas = Object.fromEntries(new FormData(event.target).entries());
  const gorduraPerc = limitarFaixa(protocolo.calcular({ sexo, idade, peso, altura, medidas }), 2, 60);

  const imc = peso / ((altura / 100) ** 2);
  const massaGorda = peso * (gorduraPerc / 100);
  const massaMagra = peso - massaGorda;
  const musculoPerc = Math.max(20, Math.min(60, 100 - gorduraPerc - 15));
  const risco = classificarRisco(gorduraPerc, sexo);

  const out = document.getElementById('saida');
  out.innerHTML = `
    <p class="kpi"><strong>Protocolo:</strong> ${protocolo.nome}</p>
    <p class="kpi"><strong>IMC:</strong> ${imc.toFixed(2)}</p>
    <p class="kpi"><strong>% Gordura:</strong> ${gorduraPerc.toFixed(2)}%</p>
    <p class="kpi"><strong>Massa gorda:</strong> ${massaGorda.toFixed(2)} kg</p>
    <p class="kpi"><strong>Massa magra:</strong> ${massaMagra.toFixed(2)} kg</p>
    <p class="kpi"><strong>% Músculo (estimado):</strong> ${musculoPerc.toFixed(2)}%</p>
    <p class="kpi"><strong>Risco cardíaco (proxy):</strong> ${risco}</p>
  `;

  document.getElementById('resultado').classList.remove('hidden');
}

function classificarRisco(gorduraPerc, sexo) {
  if (sexo === 'masculino') {
    if (gorduraPerc < 14) return 'Baixo';
    if (gorduraPerc < 25) return 'Moderado';
    return 'Elevado';
  }
  if (gorduraPerc < 21) return 'Baixo';
  if (gorduraPerc < 32) return 'Moderado';
  return 'Elevado';
}

function formatarNome(chave) {
  return chave
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .replace('iliaca', '-ilíaca')
    .trim();
}

function somaCampos(obj) {
  return Object.values(obj).reduce((acc, v) => acc + (Number(v) || 0), 0);
}

function siri(densidadeCorporal) {
  return (495 / densidadeCorporal) - 450;
}

function limitarFaixa(valor, min, max) {
  return Math.max(min, Math.min(max, valor));
}
