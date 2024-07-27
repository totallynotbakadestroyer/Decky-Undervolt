FROM ghcr.io/steamdeckhomebrew/holo-base:latest

RUN pacman -S --noconfirm cmake make clang git

ENTRYPOINT [ "/backend/entrypoint.sh" ]
