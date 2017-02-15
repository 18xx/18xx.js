import Tile from './components/tile';

export interface PointDefinition {
  readonly x: number;
  readonly y: number;
}

export default class Point {
  public static fromCenter(radians: number, distance?: number): Point {
    if (!distance) {
      distance = Tile.WIDTH / 2;
    }

    return new Point(
      Tile.CENTER.x + Math.cos(radians * Math.PI / 3) * distance,
      Tile.CENTER.y - Math.sin(radians * Math.PI / 3) * distance
    );
  }

  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
  }

  public toString(): string {
    return `${this.x},${this.y}`;
  }

  public isAtCenterX(): boolean {
    return (Math.abs(this.x - Tile.CENTER.x) < 0.001);
  }
}
