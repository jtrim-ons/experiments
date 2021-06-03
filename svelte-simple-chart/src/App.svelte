<script>
  import LineChart from "./LineChart.svelte";
  import data from "./data.csv";
  import config from "./config.js";
  import * as d3 from "d3";
</script>

<div>
    <p>
        This is an attempt to get a chart from the Simple-Charts repository
        working in Svelte.  I've more-or-less just copied the code from the line
        chart template across to LineChart.svelte, with a few changes to make
        it work in Svelte.
    </p>
    <p>
        LineChart.svelte imports d3.  I've copied some other library code (e.g.
        code from d3-jetpack) to new JS files which are imported at the top of
        LineChart.svelte.  I think there is a way to use ordinary JS script tags
        with Svelte, but I haven't figured it out!
    </p>
    <p>
        App.svelte creates two line charts (see the LineChart tags at the bottom
        of the code).  config.js contains two named configuration objects.
    </p>
</div>

<LineChart data={data} dvc={config.config0}/>
<LineChart data={data} dvc={config.config1}/>
