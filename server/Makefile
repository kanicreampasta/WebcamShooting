types/game.pb.go: protobuf/game.proto
	protoc -I=protobuf --go_out=. --go_opt=module=github.com/kanicreampasta/webcamshooting protobuf/game.proto

types/internal.pb.go: protobuf/internal.proto
	protoc -I=protobuf --go_out=. --go_opt=module=github.com/kanicreampasta/webcamshooting protobuf/internal.proto

.PHONY: all
all: types/game.pb.go types/internal.pb.go
