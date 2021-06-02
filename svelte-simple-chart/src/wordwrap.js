	export default function (
		line,
		maxCharactersPerLine,
		minCharactersPerLine,
		monospace
	) {
		var l,
			lines = [],
			w = [],
			words = [],
			w1,
			maxChars,
			minChars,
			maxLineW,
			minLineW;
		w1 = line.split(" ");
		w1.forEach(function (s, i) {
			var w2 = s.split("-");
			if (w2.length > 1) {
				w2.forEach(function (t, j) {
					w.push(t + (j < w2.length - 1 ? "-" : ""));
				});
			} else {
				w.push(s + (i < w1.length - 1 ? " " : ""));
			}
		});
		maxChars = maxCharactersPerLine || 40;
		minChars =
			minCharactersPerLine ||
			Math.max(
				3,
				Math.min(
					maxChars * 0.5,
					0.75 * w.map(word_len).sort(num_asc)[Math.round(w.length / 2)]
				)
			);
		maxLineW = maxChars * CHAR_W.a;
		minLineW = minChars * CHAR_W.a;
		l = 0;
		w.forEach(function (d) {
			var ww = sum$1(d.split("").map(char_w));
			if (l + ww > maxLineW && l > minLineW) {
				lines.push(words.join(""));
				words.length = 0;
				l = 0;
			}
			l += ww;
			return words.push(d);
		});
		if (words.length) {
			lines.push(words.join(""));
		}
		return lines.filter(function (d) {
			return d !== "";
		});
		function char_w(c) {
			return (!monospace && CHAR_W[c]) || CHAR_W.a;
		}
		function word_len(d) {
			return d.length;
		}
		function num_asc(a, b) {
			return a - b;
		}
	};