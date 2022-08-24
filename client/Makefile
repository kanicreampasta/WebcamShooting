src/game.pb.js: ../server/protobuf/game.proto
	npx pbjs -t static-module -w es6 ../server/protobuf/game.proto -o src/game.pb.js

src/game.pb.d.ts: src/game.pb.js
	npx pbts src/game.pb.js -o src/game.pb.d.ts

.PHONY: all
all: src/game.pb.js src/game.pb.d.ts
