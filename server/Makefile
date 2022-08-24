types/game.pb.go: protobuf/game.proto
	protoc -I=protobuf --go_out=. --go_opt=module=github.com/kanicreampasta/webcamshooting protobuf/game.proto

.PHONY: all
all: types/game.pb.go
