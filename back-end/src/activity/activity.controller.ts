import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request as IRequest } from '../utils/request';
import { ActivityService } from './activity.service';
import { ActivityMapper } from './mapper/activity.mapper';
import { ActivityDto, CreateActivityInput } from './types';

@Controller('activities')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly activityMapper: ActivityMapper,
  ) {}

  @Get()
  async getActivities(): Promise<ActivityDto[]> {
    const activities = await this.activityService.findAll();
    return activities.map((activity) => this.activityMapper.convert(activity));
  }

  @Get('/latest')
  async getLatest(): Promise<ActivityDto[]> {
    const activities = await this.activityService.findLatest();
    return activities.map((activity) => this.activityMapper.convert(activity));
  }

  @Get('/user')
  @UseGuards(AuthGuard)
  async getByUser(@Request() req: IRequest): Promise<ActivityDto[]> {
    const activities = await this.activityService.findByUser(req.user.id);
    return activities.map((activity) => this.activityMapper.convert(activity));
  }

  @Get('/listCities')
  async getCities(): Promise<string[]> {
    const cities = await this.activityService.findCities();
    return cities;
  }

  @Get('/cities/:city')
  async getByCity(
    @Param('city') city: string,
    @Query('activity') activity?: string | undefined,
    @Query('price') price?: string | undefined,
  ): Promise<ActivityDto[]> {
    const activities = await this.activityService.findByCity(
      city,
      activity,
      price ? Number(price) : undefined,
    );
    return activities.map((activity) => this.activityMapper.convert(activity));
  }

  @Get(':id')
  async getActivity(@Param('id') id: string): Promise<ActivityDto> {
    const activity = await this.activityService.findOne(id);
    return this.activityMapper.convert(activity);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createActivity(
    @Request() req: IRequest,
    @Body() createActivityDto: CreateActivityInput,
  ): Promise<ActivityDto> {
    const activity = await this.activityService.create(
      req.user.id,
      createActivityDto,
    );
    return this.activityMapper.convert(activity);
  }
}
