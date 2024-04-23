import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuidHelper {
  /**
   * generate guid
   * @returns new guid
   */
  public getGuid(): string {
    return (
      this.createGuidPart() +
      this.createGuidPart() +
      '-' +
      this.createGuidPart() +
      '-' +
      this.createGuidPart() +
      '-' +
      this.createGuidPart() +
      '-' +
      this.createGuidPart() +
      this.createGuidPart() +
      this.createGuidPart()
    ).toLowerCase();
  }

  /**
   * validate guid
   * @param guid input guid
   * @returns is valid
   */
  public isValidGuid(guid: string): boolean {
    const regex = new RegExp(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
    );
    const result = guid.match(regex);
    return result != null && result.length !== 0 && result[0] === guid;
  }

  /**
   * create guid part
   * @returns 4 random valid guid characters
   */
  private createGuidPart(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}
