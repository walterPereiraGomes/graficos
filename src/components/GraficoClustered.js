import { useLayoutEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Button, TextField } from "@mui/material";

function ClusteredColumnChart(props) {
  const graficoInicial = [
  ];
  const [dados, setDados] = useState(graficoInicial);
  const [nomeCampo, setNomeCampo] = useState("");
  const [valor1, setValor1] = useState(0);
  const [valor2, setValor2] = useState(0);
  const [isAdd, setIsAdd] = useState(false);
  const [nome1, setNome1] = useState("Dado 1")
  const [nome2, setNome2] = useState("Dado 2")

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
        saturate: true,
      })
    );

    // Define data
    let data = dados;

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "category",
      })
    );
    xAxis.data.setAll(data);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: nome1,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value1",
        categoryXField: "category",
      })
    );
    series1.data.setAll(data);

    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: nome2,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value2",
        categoryXField: "category",
      })
    );
    series2.data.setAll(data);

    series1.columns.template.setAll({
      strokeWidth: 1,
      cornerRadiusTL: 3,
      cornerRadiusTR: 3,
    });

    series2.columns.template.setAll({
      strokeWidth: 2,
      cornerRadiusTL: 3,
      cornerRadiusTR: 3,
    });

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    return () => {
      root.dispose();
    };
  }, [dados]);

  const adicionarCampos = () => {
    if(!nomeCampo || nomeCampo == '') {
      alert("Preencha todos os campos")
      return;
    }
    setDados((prev) => [
      ...prev,
      { category: nomeCampo, value1: parseFloat(valor1), value2: parseFloat(valor2) },
    ]);
    setNomeCampo('');
    setValor1(0);
    setValor2(0);
    setIsAdd(false);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div id="chartdiv" style={{ width: "1000px", height: "500px" }}></div>
      {!isAdd && (
        <Button variant="outlined" onClick={() => setIsAdd(true)}>
          adicionar itens no grafico
        </Button>
      )}
      {isAdd && (
        <div
          style={{
            width: 500,
            padding: 50,
            borderRadius: 5,
            border: "solid 1px #67b7dc",
          }}
        >
          <div style={{ width: "100%" }}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Nome"
              variant="outlined"
              onChange={(e) => setNomeCampo(e.target.value)}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <div style={{ width: "48%" }}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Valor 1"
                variant="outlined"
                onChange={(e) => setValor1(e.target.value)}
              />
            </div>
            <div style={{ width: "48%" }}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Valor 2"
                variant="outlined"
                onChange={(e) => setValor2(e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
              style={{ marginTop: 20 }}
              variant="outlined"
              onClick={() => {
                setIsAdd(false)
              }}
            >
              Cancelar
            </Button>
            <Button
              style={{ marginTop: 20 }}
              variant="outlined"
              onClick={() => {
                adicionarCampos()
              }}
            >
              Salvar
            </Button>
          </div>
        </div>
      )}

      <div>
        <h3>Editar nomes</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <div style={{display: 'flex', gap: 10}}>
            <TextField value={nome1} onChange={(e) => setNome1(e.target.value)}/>
            <TextField value={nome2} onChange={(e) => setNome2(e.target.value)}/>
          </div>
          <Button variant="outlined" onClick={() => setDados([...dados])}>Salvar</Button>
        </div>
      </div>
    </div>
  );
}
export default ClusteredColumnChart;
