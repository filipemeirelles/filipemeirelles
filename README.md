# Web App de Avaliação Física

Aplicação web (HTML/CSS/JS puro) para:

1. Coletar dados demográficos, perfil físico, dados antropométricos e contexto da avaliação.
2. Sugerir automaticamente o protocolo antropométrico mais adequado.
3. Permitir selecionar outro protocolo manualmente.
4. Preencher os dados específicos do protocolo escolhido.
5. Calcular e exibir indicadores como IMC, massa gorda, massa magra, percentual de gordura, percentual de músculo estimado e risco cardíaco.

## Como executar

Basta abrir o `index.html` no navegador ou executar um servidor local simples:

```bash
python3 -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Protocolos suportados

- Jackson & Pollock (3, 4 e 7 dobras)
- Slaughter (2 dobras)
- Petroski (modelo simplificado)
- Guedes (3 dobras para homens e mulheres)
- Faulkner (4 dobras)
- Evans (3 dobras para atletas, modelo simplificado)
- Peterson (4 dobras, modelo simplificado)

> Observação: protocolos marcados como “modelo simplificado” usam aproximações quando a equação completa não foi detalhada no escopo.

## Erro "Not Found" no preview (especialmente no celular)

Isso normalmente **não é por ser celular**, e sim por URL de preview/rota:

- Em preview estático, tente abrir diretamente `.../index.html`.
- Se a plataforma abrir uma subrota, o fallback `404.html` agora redireciona para a mesma app.
- Em GitHub Pages, publique a raiz do repositório e use a URL final do Pages.

Dica rápida de teste local:

```bash
python3 -m http.server 8000
# depois abra http://localhost:8000/index.html
```
