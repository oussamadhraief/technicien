import React from "react";
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export,
  PieChartTypes,
  Legend,
} from "devextreme-react/pie-chart";
import { areas } from "../utils/data";

function pointClickHandler(e: PieChartTypes.PointClickEvent) {
  toggleVisibility(e.target);
}

function legendClickHandler(e: PieChartTypes.LegendClickEvent) {
  const arg = e.target;
  const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
  toggleVisibility(item);
}

function toggleVisibility(item: any) {
  item.isVisible() ? item.hide() : item.show();
}

export default function PieChartComponent({ data }: { data: any[]}) {
  return (
    <div className="w-full flex justify-center pb-20">
      <PieChart
        id="pie"
        dataSource={areas}
        palette="Bright"
        title="Fréquence de Boitier"
        onPointClick={pointClickHandler}
        onLegendClick={legendClickHandler}
      >
        <Series argumentField="boitier" valueField="frequency">
          <Label visible={true}>
            <Connector visible={true} width={1} />
          </Label>
        </Series>

        <Size width={500} />
        <Export enabled={false} />
        <Legend
          horizontalAlignment="center"
          verticalAlignment="bottom"
          orientation="horizontal"
        />
      </PieChart>
    </div>
  );
}
