import SelectBox, { SelectBoxTypes } from "devextreme-react/select-box";
import {
  Chart,
  Series,
  ArgumentAxis,
  Legend,
  Label,
} from "devextreme-react/chart";

export default function LineChartComponent({ data }: { data: any[]}) {
  return (
    <div className="w-full flex justify-center mb-5">
      <div className="w-full max-w-screen box-border px-3">
        <Chart
          id="chart"
          dataSource={data}
          title={{
            text: "Fréquence d'intervention",
            subtitle: {
              text: "par jour",
            },
          }}
          className="w-full"
        >
          <Series argumentField="interventions" />
          <ArgumentAxis>
            <Label wordWrap="none" overlappingBehavior="hide" />
          </ArgumentAxis>
          <Legend visible={false} />
        </Chart>
      </div>
    </div>
  );
}
